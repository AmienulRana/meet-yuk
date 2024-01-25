import Image from "next/image";
import Avatar from "../Avatar";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/router";
import { useUsername } from "@/hooks/useUsername";
import { addChatService, getChatService } from "@/services/chats";
import usePeer from "@/hooks/usePeer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useShowParticipant } from "../participants/Participants";

export default function Chats() {
  const [message, setMessage] = useState<string>("");

  const { showParticipant } = useShowParticipant()
  const { roomId } = useRouter().query;
  const { myId } = usePeer();

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const { data, refetch } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const data = await getChatService(roomId as string);
      return data;
    },
    enabled: !!roomId,
    refetchInterval: 10000000000000
  });

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight + 80;
    }
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (message) {
      const messages = await addChatService({
        roomId: roomId as string,
        userId: myId,
        message,
      });
      refetch();

      setMessage("");
      scrollToBottom();
    };
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold bg-white px-5 py-3">Chats</h2>
      <div className={`overflow-auto custom-scrollbar duration-300 pb-[100px] md:pb-[50px] ${!showParticipant ? 'xl:!h-[540px] 2xl:!h-[700px] h-[350px]' : '2xl:h-[450px] h-[350px]'}`} ref={messagesContainerRef}>
        {data?.map((message: any, index:number) => {
          const checkPrevChat = data?.[index]?.myId === data?.[index - 1]?.myId;
          const checkPrevTime = moment(data?.[index]?.createdAt).format("HH:mm")  === moment(data?.[index - 1]?.createdAt).format("HH:mm");

          const isTheSameTime = checkPrevTime && checkPrevChat ? 'opacity-0' : '';
          return (
            <div
              key={message?._id}
              className={`px-5 flex justify-center w-full items-start gap-3 ${checkPrevTime && checkPrevChat ? 'py-1' : 'py-4'}`}
            >
              <Avatar text="Amineul" className={isTheSameTime}/>
              <p className="flex-1 bg-white px-3 py-2 rounded-lg text-sm">
                <span className={`block text-xs text-graytext ${isTheSameTime ? 'hidden' : ''}`}>
                  Amienul Rana
                </span>
                {message?.message}
              </p>
              <span className={`text-xs translate-y-2 text-gray-400 ${isTheSameTime}`}>
                {moment(message?.createdAt).format("HH:mm")}
              </span>
            </div>
          );
        })}
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
