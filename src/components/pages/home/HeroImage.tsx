import StreamStatus from "@/components/StreamStatus";
import { Mic, MicOff } from "lucide-react";
import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="">
      <div className="relative" data-aos="fade-up" data-aos-duration="300">
        <Image
          src={"/images/banner1.webp"}
          width={250}
          height={250}
          alt="banner 1"
          className="w-full object-cover rounded-3xl h-[300px]"
        />
        <div className="flex items-center justify-between absolute w-full top-5 left-0 px-5">
          <div className="bg-[rgba(0,0,0,.5)] px-3 text-white rounded-md flex items-center gap-2 py-1">
            <span className="w-4 rounded-full h-4 block bg-red-500 border-white border-2" />
            <p className="text-sm">REC</p>
          </div>
          <div className="bg-white px-3 textprimary rounded-md flex items-center gap-2 py-1">
            <p className="text-sm text-primary font-semibold">Dyana yeen</p>
          </div>
        </div>
        <div className="absolute bottom-5 left-[50%] bg-white px-5 rounded-md py-2 -translate-x-[50%]">
          <StreamStatus muted playing />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-5 gap-5">
        <div className="relative" data-aos="fade-up" data-aos-duration="500">
          <Image
            src={"/images/banner2.webp"}
            width={150}
            height={150}
            alt="banner 1"
            className="w-full object-cover rounded-3xl h-[150px]"
          />
          <div className="flex items-center justify-between absolute w-full bottom-2 left-0 px-5">
            <p className="bg-[rgba(0,0,0,.7)] px-2 rounded-lg py-1 text-sm text-white">
              Alice Wong
            </p>
            <Mic
              className={"text-white rounded-full p-1 bg-primary"}
              size={24}
            />
          </div>
        </div>
        <div className="relative" data-aos="fade-up" data-aos-duration="900">
          <Image
            src={"/images/banner3.webp"}
            width={150}
            height={150}
            alt="banner 1"
            className="w-full object-cover rounded-3xl h-[150px]"
          />
          <div className="flex items-center justify-between absolute w-full bottom-2 left-0 px-5">
            <p className="bg-[rgba(0,0,0,.7)] px-2 rounded-lg py-1 text-sm text-white">
              Adam Joseph
            </p>
            <MicOff
              className={"text-white  rounded-full  p-1 bg-buttonPrimary"}
              size={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
