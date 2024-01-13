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
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Participants} from "@/components/participants";

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

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser: string) => {
      console.log(`user connected in room with userId ${newUser}`);

      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream: string) => {
        console.log(`incoming stream from ${newUser}`);
        setPlayers((prev: any) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: false,
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
    const handleToggleAudio = (userId: string) => {
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

    const handleUserLeave = (userId: any) => {
      console.log(`user ${userId} is leaving the room`);
      users?.[userId]?.close();
      const playersCopy = cloneDeep(players);
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
        setPlayers((prev: any) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: false,
          },
        }));

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
      },
    }));
  }, [myId, stream]);

  return (
    <Layout>

      <section className="flex">
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
      <div className="flex-1 min-h-auto bg-gray-100  border-l-2">
      <Participants players={players} />

      </div>

      </section>
    </Layout>
  );
}
