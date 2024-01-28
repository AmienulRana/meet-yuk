import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import useCreateModal from "@/hooks/useCreateRoomModal";

interface IRowChat {
    name: string;
    message:string;
    time:string;
}

export const RowChat = ({name, message, time}: IRowChat) => {
    return (
        <div className="px-5 mt-5">
        <div className="flex justify-center w-full items-start gap-3">
          <Avatar text="Amineul" />
          <p className="flex-1 bg-white px-3 py-2 rounded-lg text-sm">
            <span className="block text-xs text-graytext">{name}</span>
            {message}
          </p>
          <span className="text-xs translate-y-2 text-gray-400">
            {time}
          </span>
        </div>
      </div>
    )
}

export default function RealTimeChat() {
  const { onOpen } = useCreateModal();
  return (
    <div
      data-aos="fade-left"
      className="relative bg-[rgb(234,253,251)] h-[300px] md:h-auto rounded-2xl"
    >
      <div className="mx-auto h-full md:w-[70%] w-[905]">
       <RowChat message="Good afternoon, everyone." name="Amienul" time="11:04 AM" />
       <RowChat message="Good afternoon sir!" name="Joseph Action" time="11:05 AM" />
       <RowChat message="Hello!" name="Dyana" time="11:06 AM" />
      </div>
      <div
        className="absolute flex justify-end flex-col text-black px-7 py-5 top-0 left-0 w-full rounded-2xl h-full bg-[rgb(234,253,251)]"
        style={{
          background:
            "linear-gradient(0deg, rgba(234,253,251,1) 0%, rgba(250,251,251,0.4) 80%)",
        }}
      >
        <h2 className="text-3xl mb-2 font-semibold">Real Time Chatting</h2>
        <p>
          Instantly connect and chat in real-time. Our platform effortlessly
          records video and audio during meetings. Stay in sync effortlessly!
        </p>
        <Button
          onClick={onOpen}
          size="small"
          variant="background"
          className="px-6 mt-5"
        >
          Try Now
        </Button>
      </div>
    </div>
  );
}
