import useJoinModal from "@/hooks/useJoinRoomModal";
import { Modal } from ".";
import Button from "../Button";
import Input from "../Input";
import { checkExistRoom } from "@/services/rooms";
import { useUsername } from "@/hooks/useUsername";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ModalJoinRoom() {
  const { isOpen, onClose } = useJoinModal();

  const [isLoading, setIsLoading] = useState(false);
  const [roomId, setRoomId] = useState("");
  const { username, setUsername } = useUsername();

  const router = useRouter();

  const handleJoinRoom = async () => {
    setIsLoading(true);
    if (await checkExistRoom(roomId)) {
      return router.push(`/${roomId}`);
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <p className="text-2xl mb-5">Join Room</p>

        <Input
          label="Your Name"
          placeholder="ex: Amienul Rana"
          onChange={(e) => setUsername(e?.target?.value)}
        />
        <Input
          label="Room ID"
          placeholder="ex: 65a918312....f1b"
          onChange={(e) => setRoomId(e?.target?.value)}
        />
        <p className="text-sm italic text-gray-400 w-full mt-2">
          *Please write ID to enter the room
        </p>
        <Button
          onClick={handleJoinRoom}
          variant="background"
          size="large"
          className="mt-5"
          disabled={isLoading}
        >
          Join Room
        </Button>
      </div>
    </Modal>
  );
}
