import { useEffect, useState } from "react";
import CopySection from "./CopySection";
import Logo from "./Logo";
import { getDetailRoomService } from "@/services/rooms";
import { useRouter } from "next/router";
import { Clock } from "./pages/room";

type TDetailRoom = {
  name:string;
  time:string;
}

export default function NavbarRoom() {
  const router= useRouter();

  const [detailRoom, setDetailRoom] = useState<TDetailRoom>()

  useEffect(() => {
    async function getDetailRoom(){
      const data = await getDetailRoomService(router?.query?.roomId as string);
      console.log(data);
      setDetailRoom({name: data?.room?.name, time: data?.room?.createdAt})
    }

    getDetailRoom();
  }, [router])

  return (
    <div className="flex border-b-2 border-lightgray md:px-10 px-4 items-center">
      <div className="border-r pr-10 py-2 border-gray-200">
        <Logo />
      </div>
      <div className="flex items-center flex-1 justify-between px-9">
        <div className="">
          <h1 className="text-xl font-semibold">
            {detailRoom?.name}
          </h1>
          <Clock meetingTime={detailRoom?.time || ''} />
          {/* <p className="text-sm mt-1 text-graytext">
            Jan 12th, 2024 | 11:00 AM
          </p> */}
        </div>
        <CopySection roomId={router?.query?.roomId as string || ''} />
      </div>
    </div>
  );
}
