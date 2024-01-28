import Image from "next/image";
import { CardFeature } from "..";
import { BsCameraVideoFill, BsChatLeftFill, BsStars } from "react-icons/bs";
import { TbScreenShare } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import Container from "@/components/Container";

export default function Benefits(){
    return (
        <Container className="grid md:grid-cols-2 md:mt-48 mt-24">
        <div className="bg-[#F4F7FB] md:h-[600px] w-full lg:w-[700px] px-8 md:py-32 py-10 mb-10">
          <div className="md:w-[70%] w-full">
            <h2 className="text-5xl">More Flexible and Helpful for Users</h2>
            <p className="text-gray-500 mt-4">
              CallYuk makes it easy for users to create their meeting room, and
              can learn anything in the meeting
            </p>
            <div className="mt-10">
              <p className="flex gap-2 mb-3 items-center">
                <FaCheckCircle className="text-lg min-w-max min-h-max" />
                <span className="">
                  Schedule a time for users to enter the room
                </span>
              </p>
              <p className="flex gap-2 mb-3 items-center">
                <FaCheckCircle className="text-lg min-w-max min-h-max" />
                <span className="">Limit users who can enter the room</span>
              </p>
              <p className="flex gap-2 mb-3 items-center">
                <FaCheckCircle className="text-lg min-w-max min-h-max" />
                <span className="">
                  Private room, users cannot enter the room without the link
                  provided
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="relative md:-translate-x-8 h-max">
          <div className="grid md:grid-cols-2 z-10 gap-5">
            <div data-aos="fade-down">
              <CardFeature
                title="Build to event"
                Icon={BsCameraVideoFill}
                desc="Create a room for online meetings with your team members"
                color="purple"
              />
            </div>
            <div data-aos="fade-down" data-aos-duration="500">
              <CardFeature
                title="Easy to use"
                Icon={BsStars}
                desc="Find the create room button to create, and join room to join. simple, does not require auth"
                color="blue"
              />
            </div>
            <div data-aos="fade-up" data-aos-duration="900">
              <CardFeature
                title="Share Screen"
                Icon={TbScreenShare}
                desc="Want a percentage? Don't worry, you can share your screen with users in the room"
                color="orange"
              />
            </div>
            <div data-aos="fade-up" data-aos-duration="1200">
              <CardFeature
                title="Real Time Chat"
                Icon={BsChatLeftFill}
                desc="Can't get on the mic during a meeting? You can use the chat feature available in the room"
                color="green"
              />
            </div>
          </div>
          <Image
            src={"/dots.svg"}
            width={100}
            height={100}
            alt="dots svg"
            className="absolute -bottom-8 -left-8 -z-10"
          />
        </div>
      </Container>
    )
}