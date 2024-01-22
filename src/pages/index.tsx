import Image from "next/image";
import { Inter } from "next/font/google";
import { useSocket } from "@/context/SocketContext";
import { useEffect, useState } from "react";
import usePeer from "@/hooks/usePeer";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/home.module.css";
import { useUsername } from "@/hooks/useUsername";
import axios from "axios";
import NavbarHome from "@/components/NavbarHome";
import Container from "@/components/Container";
import StreamStatus from "@/components/StreamStatus";
import { Mic, MicOff } from "lucide-react";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { BsCameraVideoFill, BsChatLeftFill, BsStars } from "react-icons/bs";
import { CardFeature } from "@/components/pages/home";
import { TbScreenShare } from "react-icons/tb";
import {Footer} from "@/components/footer";
import { Modal, ModalCreateRoom } from "@/components/modal";
import Input from "@/components/Input";
import useJoinModal from "@/hooks/useJoinRoomModal";
import ModalJoinRoom from "@/components/modal/ModalJoinRoom";
import useCreateModal from "@/hooks/useCreateRoomModal";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const { username, setUsername } = useUsername();

  const { onOpen } = useCreateModal()
  const { onOpen: openJoinModal } = useJoinModal()



  const [loading, setIsLoading] = useState(false);

  

 

  useEffect(() => {}, []);
  return (
    <div>
      <NavbarHome />
      <Container className="grid gap-10  mt-20 grid-cols-2">
        <div>
          <h1 className="text-5xl leading-[55px]">
            Meetings without worrying about{" "}
            <span className="text-primary">cost and limit time.</span>
          </h1>
          <p className="mt-4">
            Use CallYuk to get a new experience in doing video meet, don&apos;t
            care about cost and limit time. You can meet for however long you
            want
          </p>
          <div className="mt-7 grid grid-cols-2">
            <div className="">
              <h2 className="text-primary text-4xl font-semibold">5K+</h2>
              <p className="text-gray-400 text-sm mt-1">
                Active users per month
              </p>
            </div>
            <div className="">
              <h2 className="text-primary text-4xl font-semibold">700+</h2>
              <p className="text-gray-400 text-sm mt-1">
                Room created per month
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="relative">
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
            <div className="relative">
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
            <div className="relative">
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
      </Container>
      <Container className="mt-48">
        <p className="text-center mb-4 text-gray-400">
          Used daily by more than{" "}
          <span className="font-bold text-primary">200+</span> Company
        </p>
        <div className="border flex px-5 justify-between border-gray-300 rounded-md mx-auto lg:w-1/2 md:w-[80%] w-full">
          <Image
            src={"/images/company/upwork.png"}
            height={80}
            width={80}
            alt="upwork"
            className="object-contain"
          />
          <Image
            src={"/images/company/microsoft.png"}
            height={80}
            width={80}
            alt="microsoft"
            className="object-contain"
          />
          <Image
            src={"/images/company/netflix.png"}
            height={80}
            width={80}
            alt="netflix"
            className="object-contain"
          />
          <Image
            src={"/images/company/slack.png"}
            height={80}
            width={80}
            alt="slack"
            className="object-contain"
          />
          <Image
            src={"/images/company/fiverr.png"}
            height={80}
            width={80}
            alt="fiverr"
            className="object-contain"
          />
        </div>
        <section className="mt-48 grid gap-20 grid-cols-2">
          <div className="relative rounded-2xl overflow-hidden">
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
              <h2 className="text-3xl mb-2 font-semibold">
                Automatic Recording
              </h2>
              <p>
                Start a meeting and our platform will automatically record video
                and audio in real-time
              </p>
              <Button onClick={onOpen} size="small" variant="background" className="px-6 mt-5">
                Try Now
              </Button>
            </div>
          </div>
          <div className="relative bg-[rgb(234,253,251)] rounded-2xl overflow-hidden">
            <div className="mx-auto h-full md:w-[70%] w-[905] ">
              <div className="px-5 mt-5">
                <div className="flex justify-center w-full items-start gap-3">
                  <Avatar text="Amineul" />
                  <p className="flex-1 bg-white px-3 py-2 rounded-lg text-sm">
                    <span className="block text-xs text-graytext">
                      Amienul Rana
                    </span>
                    Good afternoon, everyone.
                  </p>
                  <span className="text-xs translate-y-2 text-gray-400">
                    11:01 AM
                  </span>
                </div>
              </div>
              <div className="px-5 mt-2">
                <div className="flex justify-center w-full items-start gap-3">
                  <Avatar color="#f5fa" text="Joseph" />
                  <p className="flex-1 bg-white px-3 py-2 rounded-lg text-sm">
                    <span className="block text-xs text-graytext">
                      Joseph Action
                    </span>
                    Good afternoon sir!
                  </p>
                  <span className="text-xs translate-y-2 text-gray-400">
                    11:02 AM
                  </span>
                </div>
              </div>
              <div className="px-5 mt-2">
                <div className="flex justify-center w-full items-start gap-3">
                  <Avatar color="#278121" text="Dyana" />
                  <p className="flex-1 bg-white px-3 py-2 rounded-lg text-sm">
                    <span className="block text-xs text-graytext">Dyana</span>
                    Hello!
                  </p>
                  <span className="text-xs translate-y-2 text-gray-400">
                    11:02 AM
                  </span>
                </div>
              </div>
            </div>
            <div
              className="absolute flex justify-end flex-col text-black px-7 py-5 top-0 left-0 w-full h-full bg-[rgb(234,253,251)]"
              style={{
                background:
                  "linear-gradient(0deg, rgba(234,253,251,1) 0%, rgba(250,251,251,0.4) 80%)",
              }}
            >
              <h2 className="text-3xl mb-2 font-semibold">
                Real Time Chatting
              </h2>
              <p>
                Instantly connect and chat in real-time. Our platform
                effortlessly records video and audio during meetings. Stay in
                sync effortlessly!
              </p>
              <Button onClick={onOpen} size="small" variant="background" className="px-6 mt-5">
                Try Now
              </Button>
            </div>
          </div>
        </section>
      </Container>
      <Container className="grid grid-cols-2 mt-48">
        <div className="bg-[#F4F7FB] h-[600px] w-[700px] px-8 py-32">
          <div className="w-[70%]">
            <h2 className="text-5xl">More Flexible and Helpful for Users</h2>
            <p className="text-gray-500 mt-4">
              CallYuk makes it easy for users to create their meeting room, and
              can learn anything in the meeting
            </p>
            <div className="mt-10">
              <p className="flex gap-2 mb-3 items-center">
                <FaCheckCircle className="text-lg" />
                <span className="">
                  Schedule a time for users to enter the room
                </span>
              </p>
              <p className="flex gap-2 mb-3 items-center">
                <FaCheckCircle className="text-lg" />
                <span className="">Limit users who can enter the room</span>
              </p>
              <p className="flex gap-2 mb-3 items-center">
                <FaCheckCircle className="text-lg" />
                <span className="">
                  Private room, users cannot enter the room without the link
                  provided
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="relative -translate-x-8 h-max">
          <div className="grid grid-cols-2 z-10 gap-5">
            <CardFeature
              title="Build to event"
              Icon={BsCameraVideoFill}
              desc="Create a room for online meetings with your team members"
              color="purple"
            />
            <CardFeature
              title="Easy to use"
              Icon={BsStars}
              desc="Find the create room button to create, and join room to join. simple, does not require auth"
              color="blue"
            />
            <CardFeature
              title="Share Screen"
              Icon={TbScreenShare}
              desc="Want a percentage? Don't worry, you can share your screen with users in the room"
              color="orange"
            />
            <CardFeature
              title="Real Time Chat"
              Icon={BsChatLeftFill}
              desc="Can't get on the mic during a meeting? You can use the chat feature available in the room"
              color="green"
            />
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

      <section className="mt-48 bg-[#ECF2FF] py-20">
        <Container>
          <section className="flex">
            <Image
              src="/images/ceo.jpg"
              width={500}
              height={500}
              className="rounded-xl w-[520px] h-[400px]"
              alt="ceo image"
            />
            <div className="flex-1 mt-2 md:translate-y-8 px-5">
              <div className="bg-white md:-translate-x-20 rounded-lg px-6 py-4">
                <h2 className="text-4xl leading-tight">
                  &quot;CallYuk is an Application that is easy to use for
                  meetings, I feel helped by this Application&quot;
                </h2>
              </div>
              <p className="mt-5 font-semibold">Brandon Jackson</p>
              <span className="text-gray-500 text-sm">CEO at RoomsResto</span>
            </div>
          </section>
        </Container>
      </section>

      <Container className="mt-24 text-center flex flex-col items-center">
            <h2 className="text-4xl font-semibold text-primary">Try callyuk today</h2>
            <p className="mt-5 md:w-[60%] mx-auto">With our advanced modern technology, your meetings are not just recorded - they&apos;re transformed into valuable insight and productivity boosters.</p>
            <Button onClick={openJoinModal} size="small" variant="background" className="my-5 px-7">
                Start Now
            </Button>
            <div className="my-10 relative">
            <Image
            src={"/dots.svg"}
            width={100}
            height={100}
            alt="dots svg"
            className="absolute -top-8 -right-8 -z-10"
          />
              <div className="relative">
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
                <div className="relative">
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
            <div className="relative">
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
          <Image
            src={"/dots.svg"}
            width={100}
            height={100}
            alt="dots svg"
            className="absolute -bottom-8 -left-8 -z-10"
          />
        </div>
      </Container>

      <Footer />
      

      <ModalJoinRoom />
      <ModalCreateRoom />

      <Toaster  />
      
      {/* <div
        className={
          "w-4/12 mx-auto p-2 border border-white rounded mt-8 text-white flex flex-col items-center"
        }
      >
        <h1 className="text-xl text-center">Google Meet Clone</h1>
        <div className="flex flex-col items-center mt-3 w-full">
          <input
            className="text-black text-lg p-1 rounded w-9/12 mb-3"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => {
              setRoomName(e?.target?.value);
            }}
          />
          <input
            className="text-black text-lg p-1 rounded w-9/12 mb-3"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e?.target?.value);
            }}
          />
          <input
            className="text-black text-lg p-1 rounded w-9/12 mb-3"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e?.target?.value)}
          />
          <button
            className={`bg-buttonPrimary py-2 px-4 rounded ${
              loading && "opacity-60"
            }`}
            disabled={loading}
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
        <span className="my-3 text-xl">--------------- OR ---------------</span>
        <button
          disabled={loading}
          className={`bg-buttonPrimary py-2 px-4 rounded ${
            loading && "opacity-60"
          }`}
          onClick={createAndJoin}
        >
          Create a new room
        </button>
      </div> */}
    </div>
  );
}
