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

export default function Room() {
  const socket = useSocket();
  const { roomId } = useRouter().query;
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom
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
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [newUser]: call
        }))
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
        console.log(copy);
        copy[userId].playing = !copy?.[userId]?.playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId: any) => {
      console.log(`user ${userId} is leaving the room`);
      users?.[userId]?.close()
      const playersCopy = cloneDeep(players);
      delete playersCopy[userId];
      setPlayers(playersCopy);
    }
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
    peer.on("call", (call: any) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream: string) => {
        console.log(`incoming stream from ${callerId}`);
        setPlayers((prev: any) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [callerId]: call
        }))
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
        playing: true,
      },
    }));
  }, [myId, stream]);

  return (
    <div>
      <div
        className="absolute w-9/12 left-0 right-0 mx-auto top-[20px] bottom-[50px]"
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
      </div>

      <div
        className=" absolute flex flex-col overflow-y-auto w-[200px] right-[20px] top-5"
        style={{ height: " calc(100vh - 20px)" }}
      >
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
      </div>
      <CopySection roomId={roomId as string}/>

      <Bottom
        muted={playerHighlighted?.muted}
        playing={playerHighlighted?.playing}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        leaveRoom={leaveRoom}
      />
    </div>
  );
}
