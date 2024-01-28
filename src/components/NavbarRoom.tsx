import { useEffect, useState } from "react";
import CopySection from "./pages/room/CopySection";
import Logo from "./Logo";
import { getDetailRoomService } from "@/services/rooms";
import { useRouter } from "next/router";
import { Clock } from "./pages/room";
import { FormInput, GripHorizontal } from "lucide-react";
import { create } from "zustand";

type TDetailRoom = {
  name: string;
  time: string;
};


export default function NavbarRoom() {
  const router = useRouter();

  const [detailRoom, setDetailRoom] = useState<TDetailRoom>();


  useEffect(() => {
    async function getDetailRoom() {
      const data = await getDetailRoomService(router?.query?.roomId as string);
      setDetailRoom({ name: data?.room?.name, time: data?.room?.createdAt });
    }

    getDetailRoom();
  }, [router]);

  return (
    <div className="flex justify-between md:justify-normal flex-wrap border-b-2 border-lightgray md:px-10 px-4 items-center">
      <div className="md:border-r md:pr-10 pr-5 py-2 border-gray-200">
        <Logo />
      </div>
      <div className="flex items-center md:flex-1 justify-between md:px-9">
        <TitleRoom className="hidden md:block" detailRoom={detailRoom} />
        <CopySection roomId={(router?.query?.roomId as string) || ""} />
      </div>
        <TitleRoom
          className="w-full pb-3 mt-1 md:hidden"
          detailRoom={detailRoom}
        />
        
    </div>
  );
}

interface ITitleRoom {
  detailRoom: TDetailRoom | undefined;
  className?: string;
}

export function TitleRoom({ detailRoom, className }: ITitleRoom) {
  return (
    <div className={className}>
      <h1 className="text-xl font-semibold">{detailRoom?.name}</h1>
      <Clock meetingTime={detailRoom?.time || ""} />
    </div>
  );
}
