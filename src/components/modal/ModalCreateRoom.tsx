import { useUsername } from "@/hooks/useUsername";
import { Modal } from ".";
import Button from "../Button";
import Input from "../Input";
import useCreateModal from "@/hooks/useCreateRoomModal";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function ModalCreateRoom() {
  const { isOpen, onClose } = useCreateModal();
  const { username, setUsername } = useUsername();
  const [roomName, setRoomName] = useState('');
  const [isLoading, setIsLoading] = useState(false);




  const router = useRouter();




  const createAndJoin = async () => {
    if(!roomName || !username) return toast.error('Please Input Room name or username')
    setIsLoading(true);
    try {
      const response = await axios.post("/api/room", { roomName });
      const id = response?.data?.room?._id;
      router.push(`/${id}`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <p className="text-2xl mb-5">Create Your Room</p>

        <Input label="Room Name" placeholder="ex: Daily Meeting Team Dev"
          onChange={(e) => setRoomName(e?.target?.value)}

        />
        <Input label="Your Name" placeholder="ex: Amienul Rana"
          onChange={(e) => setUsername(e?.target?.value)}

        />        
        <Button onClick={createAndJoin} variant="background" disabled={isLoading} size="large" className="mt-5">
          Create Room
        </Button>
      </div>
    </Modal>
  );
}
