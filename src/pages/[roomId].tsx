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
  const {username} = useUsername();

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    const handleUserConnected = ({userId: newUser, username}: IUser) => {
      console.log(`user connected in room with userId ${newUser}`);

      console.log(username);

      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream: string) => {
        console.log(`incoming stream from ${newUser}`);
        setPlayers((prev: any) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: false,
            username
          },
        }));

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
  }, [socket, peer, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId:string) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev: any) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy?.[userId]?.muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId: string) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev: any) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy?.[userId]?.playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId: string) => {
      console.log(`user ${userId} is leaving the room`);
      users?.[userId as any]?.close();
      const playersCopy = cloneDeep(players);
      console.log(playersCopy);
      delete playersCopy[userId];
      setPlayers(playersCopy);
    };

    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);
    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [setPlayers, users, socket]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer?.on("call", (call: any) => {
      const { peer: callerId } = call;
      call?.answer(stream);

      call?.on("stream", (incomingStream: string) => {
        console.log(`incoming stream from ${callerId}`);
        setPlayers((prev: any) => {
          return {
            ...prev,
            [callerId]: {
              ...prev[callerId],
              url: incomingStream,
            },
          };
        });

        setUsers((prev) => ({
          ...prev,
          [callerId]: call,
        }));
      });
    });
  }, [peer, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`setting my stream ${myId}`);
    setPlayers((prev: any) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: false,
        username,
      },
    }));
  }, [myId, stream, username]);

  useEffect(() => {
    console.log('all players', players)
  }, [players])

  return (
    <Layout>
      <section className="flex relative">
        <div
          className="w-9/12 md:px-10 px-4 py-3 min-h-screen bg-lightgray"
          style={{ height: "calc(100vh - 20px - 100px)" }}
        >
          {playerHighlighted && (
            <Player
              url={playerHighlighted?.url}
              muted={playerHighlighted?.muted}
              playing={playerHighlighted?.playing}
              isActive
            />
          )}
          <div className="flex gap-12 custom-scrollbar flex-nowrap whitespace-nowrap overflow-x-auto">
            {/* {[1, 2, 3, 4, 5, 6, 7, 8].map(() => ( */}
            <>
              {Object.keys(nonHighlightedPlayers).map((playerId) => {
                const { url, muted, playing } = nonHighlightedPlayers[playerId];
                return (
                  <Player
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
          <div className="mt-4">
            <h2 className="text-lg font-semibold bg-white px-5 py-3">Chats</h2>
            <div className="px-5 py-4">
              <div className="flex justify-center w-full items-start gap-3">
                <Avatar text="Amineul" />
                <p className="flex-1 bg-white px-3 py-2 rounded-lg text-sm">
                  <span className="block text-xs text-graytext">
                    Amienul Rana
                  </span>
                  Good afternoon, everyone.
                </p>
                <span className="text-xs translate-y-2 text-gray-400">
                  11:01 AM
                </span>
              </div>
              <div className="flex justify-center mt-3 w-full items-start gap-3">
                <Avatar text="Amineul" className="opacity-0 invisible" />
                <p className="flex-1 bg-white px-3 py-2 rounded-lg text-sm">
                  We will start this meeting
                </p>
                <span className="text-xs opacity-0 invisible translate-y-2 text-gray-400">
                  11:01 AM
                </span>
              </div>
              <div className="flex mt-3 justify-center w-full items-start gap-3">
                <Avatar text="Joshua" />
                <p className="flex-1 bg-white px-3 py-2 rounded-lg text-sm">
                  <span className="block text-xs text-graytext">
                  Joshua Abraham
                  </span>
                  Yes, Let’s start this meeting
                </p>
                <span className="text-xs translate-y-2 text-gray-400">
                  11:02 AM
                </span>
              </div>
              <div className="flex justify-center mt-3 w-full items-start gap-3">
                <Avatar text="Amineul" />
                <p className="flex-1 bg-white px-3 py-2 rounded-lg text-sm">
                Today, we are here to discuss last week’s sales.
                </p>
                <span className="text-xs translate-y-2 text-gray-400">
                  12:04 AM
                </span>
              </div>
            </div>

            <div className="bg-white absolute bottom-0 left-0 w-full h-[80px] py-3 px-4">
              <div className="relative">
                <input className="bg-gray-100 w-full px-5 py-3 outline-0 rounded-full" placeholder="Type Something..." />
                <button className="absolute top-1/2 -translate-y-[50%] right-5 ">
                  <Image src="/send-message.svg" alt="send message icon"  width={35} height={35}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
