import Button from "@/components/Button";
import useCreateModal from "@/hooks/useCreateRoomModal";
import Image from "next/image";

export default function Recording() {
  const { onOpen } = useCreateModal();

  return (
    <div className="relative rounded-2xl overflow-hidden" data-aos="fade-right">
      <Image
        src={"/images/image-recording.webp"}
        width={300}
        height={300}
        className="w-full"
        alt="image recording"
      />
      <div
        className="absolute flex justify-end flex-col text-white px-7 py-5 top-0 left-0 w-full h-full bg-[rgb(23, 208, 255)]"
        style={{
          background:
            "linear-gradient(0deg, rgba(2,0,36,.5) 0%, rgba(23, 208, 255, 1) 0%, rgba(250,251,251,0.1) 74%)",
        }}
      >
        <h2 className="text-3xl mb-2 font-semibold">Automatic Recording</h2>
        <p>
          Start a meeting and our platform will automatically record video and
          audio in real-time
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
