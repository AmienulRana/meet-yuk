import Image from "next/image";
import Avatar from "../Avatar";
import { FormEvent, useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/router";
import { useUsername } from "@/hooks/useUsername";
import { addChatService, getChatService } from "@/services/chats";
import usePeer from "@/hooks/usePeer";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Chats() {
  const [message, setMessage] = useState<string>("");
  const { roomId } = useRouter().query;
  const { myId } = usePeer();

  const queryClient = useQueryClient();

  // Queries
  const { data, refetch } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const data = await getChatService(roomId as string);
      return data;
    },
    enabled: !!roomId,
  });

  // const handleSendMessage = () => {
  //   console.log(`${username} has sent message to ${roomId}`);
  //   socket?.emit("chat-message", roomId, username, message);
  //   setMessage("");
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (message) {
      const messages = await addChatService({
        roomId: roomId as string,
        userId: myId,
        message,
      });
      refetch()

      setMessage("");
    } else alert("empty input");
  };

  useEffect(() => {
    console.log(data);
  }, [data])
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold bg-white px-5 py-3">Chats</h2>
      <div className="px-5 py-4">
        <div className="flex justify-center w-full items-start gap-3">
          <Avatar text="Amineul" />
          <p className="flex-1 bg-white px-3 py-2 rounded-lg text-sm">
            <span className="block text-xs text-graytext">Amienul Rana</span>
            Good afternoon, everyone.
          </p>
          <span className="text-xs translate-y-2 text-gray-400">11:01 AM</span>
        </div>
      </div>

      <div className="bg-white absolute bottom-0 left-0 w-full h-[80px] py-3 px-4">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-gray-100 w-full px-5 py-3 outline-0 rounded-full"
              placeholder="Type Something..."
            />
            <button
              type="submit"
              className="absolute top-1/2 -translate-y-[50%] right-5 "
            >
              <Image
                src="/send-message.svg"
                alt="send message icon"
                width={35}
                height={35}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
