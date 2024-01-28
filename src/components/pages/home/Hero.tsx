import Container from "@/components/Container";
import StreamStatus from "@/components/pages/room/StreamStatus";
import { Mic, MicOff } from "lucide-react";
import Image from "next/image";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <Container className="grid gap-10 mt-20 md:grid-cols-2">
      <div data-aos="fade-up">
        <h1 className="text-5xl leading-[55px]">
          Meetings without worrying about{" "}
          <span className="text-primary">cost and limit time.</span>
        </h1>
        <p className="mt-4">
          Use CallYuk to get a new experience in doing video meet, don&apos;t
          care about cost and limit time. You can meet for however long you want
        </p>
        <div className="mt-7 grid grid-cols-2">
          <div className="">
            <h2 className="text-primary text-4xl font-semibold">5K+</h2>
            <p className="text-gray-400 text-sm mt-1">Active users per month</p>
          </div>
          <div className="">
            <h2 className="text-primary text-4xl font-semibold">700+</h2>
            <p className="text-gray-400 text-sm mt-1">Room created per month</p>
          </div>
        </div>
      </div>
      <HeroImage />
    </Container>
  );
}
