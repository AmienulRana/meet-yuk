import Bottom from "@/components/Bottom";
import Player from "@/components/Player";
import { useSocket } from "@/context/SocketContext";
import useMediaStream from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import { useRouter } from "next/router";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import CopySection from "@/components/CopySection";
import Logo from "@/components/Logo";
import Layout from "@/components/Layout";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Participants } from "@/components/participants";
import Avatar from "@/components/Avatar";
import Image from "next/image";
import { IUser } from "@/libs/interface";
import { useUsername } from "@/hooks/useUsername";
import { Chats } from "@/components/chats";
import axios from "axios";
import { getRandomBrightColor } from "@/libs/utils";

type IncomingStream = {
  url: MediaStream;
  call: any;
  // userId: any
};

export default function Room() {
  const socket = useSocket();
  const { roomId } = useRouter().query;
  const { peer, myId } = usePeer();
  const { stream, handleOpenCamera } = useMediaStream();
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, roomId as string, peer);

  const [users, setUsers] = useState<any[]>([]);
  const { username } = useUsername();

  const [incomingStream, setIncomingStream] = useState<IncomingStream>();

  const [messages, setMessages] = useState<any>([]);

  const router = useRouter();

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    const handleUserConnected = ({ userId: newUser, username }: IUser) => {
      const call = peer?.call(newUser, stream);
        call?.on("stream", async (incomingStream: any) => {
          // console.log(`incoming stream from ${newUser}`);
          // console.log('run my stream sfter 3s')
          const users = await getAllUser(false);
          setPlayers((prev: any) => {
            return {
              ...prev,
              [newUser]: {
                ...users[newUser],
                url: incomingStream,
              },
            };
          });
  
          setUsers((prev) => ({
            ...prev,
            [newUser]: call,
          }));
        });
    };
      socket?.on("user-connected", handleUserConnected);

    return () => {
      socket?.off("user-connected", handleUserConnected);
    };
  }, [socket, peer, stream, players]);

  useEffect(() => {
    if (!incomingStream?.call) return;
  }, [incomingStream, players]);

  useEffect(() => {
    if (!socket) return;

    const handleToggleAudio = (userId: string) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev: any) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy?.[userId]?.muted;
        return { ...copy };
      });
    };
    const handleUserLeave = (userId: string) => {
      console.log(`user ${userId} is leaving the room`);
      users?.[userId as any]?.close();
      const playersCopy = cloneDeep(players);
      delete playersCopy[userId];
      setPlayers(playersCopy);
    };

    const handleToggleVideo = (userId: string) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev: any) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy?.[userId]?.playing;
        return { ...copy };
      });
    };

    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);
    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [setPlayers, users, socket, players]);

  useEffect(() => {
    if (!socket || !peer || !myId) return;
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("refresh", "refreshthepage");
    });
  }, [socket, peer, myId]);
  useEffect(() => {
    if (!socket || !peer || !myId) return;
    const isPageRefresh = localStorage.getItem("refresh");
    if (isPageRefresh) {
      localStorage.removeItem("refresh");
      leaveRoom();
    } else {
      console.log("no refresh");
    }
  }, [socket, peer, myId]);

  useEffect(() => {
    if (!peer || !stream) return;
      peer?.on("call", (call: any) => {
        const { peer: callerId } = call;
        call.answer(stream);

        
        call.on("stream", async (incomingStream: string) => {
          console.log(`incoming stream from ${callerId}`);
          console.log('run incoming stream after 3000s');

          // console.log('states player', players)
  
          const users = await getAllUser(false, 'waktu panggil my stream');
          console.log('user get in incoming stream', users);
          setPlayers((prev: any) => {
            return {
              ...prev,
              [callerId]: {
                ...users[callerId],
                url: incomingStream,
              },
            };
          });
          console.log('set players')
  
          setUsers((prev) => ({
            ...prev,
            [callerId]: call,
          }));
        });
      });
  }, [peer, stream]);

  async function getAllUser(setAgainPlayer: boolean, message?: string) {
    try {
      // console.log('run get all user');
      const response = await axios.get(`/api/users?roomId=${roomId}`);
      console.log(response?.data);
      const newStructureRes: any[] = response?.data?.map((player: any) => ({
        [player?.myId]: {
          username: player?.username,
          muted: player?.muted,
          playing: player?.playing,
          color: player?.color,
        },
      }));

      console.log('new structure res', newStructureRes, message);
      
      if (setAgainPlayer) {
        console.log('resonponse from get all user', newStructureRes)
        for (let i = 0; i < newStructureRes?.length; i++) {
          setPlayers({ ...players, ...Object.assign({}, ...newStructureRes) });
        }
      }

      return { ...Object.assign({}, ...newStructureRes) };
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // if(!roomId) return;
    getAllUser(true, 'first get all users');
  }, [roomId])

  useEffect(() => {
    // console.log(stream, myId);
    if (!stream || !myId) return;

    const setMyStream = async () => {
      const users = await getAllUser(false);
      console.log('state waktu set my stream', users);
      setPlayers((prev: any) => {
        return {
          ...prev,
          [myId]: {
            ...users[myId],
            url: stream,
            muted: true,
            playing: false,
          },
        };
      });
    };

    setMyStream();

    async function createNewUser() {
      try {
        const payload = {
          muted: true,
          playing: false,
          username,
          color: getRandomBrightColor(),
          myId,
          roomId,
        };
        sessionStorage.setItem('myId', myId);
        await axios.post("/api/users", payload);
        await getAllUser(true);
        setMyStream();
      } catch (error) {
        console.log(error);
      }
    }
    createNewUser();
  }, [roomId, myId, stream]);

  useEffect(() => {
    console.log(players);
  }, [players]);

  // useEffect(() => {
  //   if (!socket || !username || !roomId) return;
  //   socket?.emit("join_room", { username, roomId });
  // }, [socket, username, roomId]);

  // useEffect(() => {
  //   socket?.on("message", (message) => {
  //     setMessages((messages: any) => [...messages, message]);
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   console.log('chats',messages);
  // }, [messages])

  return (
    <Layout>
      <section className="md:flex relative">
        <div
          className="lg:w-9/12 md:w-2/3 w-full md:px-10 px-4 py-3 md:min-h-screen h-full mb-[100px] md:mb-0 bg-lightgray"
        >
          {playerHighlighted && (
            <Player
              username={playerHighlighted?.username}
              url={playerHighlighted?.url}
              muted={playerHighlighted?.muted}
              playing={playerHighlighted?.playing}
              isActive
            />
          )}
          <div className="flex pb-[50px] gap-12 custom-scrollbar flex-nowrap whitespace-nowrap overflow-x-auto">
            <>
              {Object.keys(nonHighlightedPlayers).map((playerId) => {
                const { url, muted, playing, username } =
                  nonHighlightedPlayers[playerId];
                return (
                  <Player
                    username={username}
                    key={playerId}
                    url={url}
                    muted={muted}
                    playing={playing}
                    isActive={false}
                  />
                );
              })}
            </>
          </div>
          <Bottom
            muted={playerHighlighted?.muted}
            playing={playerHighlighted?.playing}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            leaveRoom={leaveRoom}
          />
        </div>
        <div className="flex-1 relative min-h-auto bg-gray-100  border-l-2">
          <Participants players={players} />
          <Chats />
        </div>
      </section>
    </Layout>
  );
}
