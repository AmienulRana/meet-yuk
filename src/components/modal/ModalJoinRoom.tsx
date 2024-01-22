import useJoinModal from "@/hooks/useJoinRoomModal";
import { Modal } from ".";
import Button from "../Button";
import Input from "../Input";

export default function ModalJoinRoom() {
  const { isOpen, onClose } = useJoinModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <p className="text-2xl mb-5">Join Room</p>

        <Input label="Your Name" placeholder="ex: Amienul Rana" />
        <Input label="Room ID" placeholder="ex: 65a918312....f1b" />
        <p className="text-sm italic text-gray-400 w-full mt-2">
          *Please write ID to enter the room
        </p>
        <Button variant="background" size="large" className="mt-5">
          Join Room
        </Button>
      </div>
    </Modal>
  );
}
