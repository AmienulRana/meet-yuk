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

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const { username, setUsername } = useUsername();

  const [loading, setIsLoading] = useState(false);

  const createAndJoin = async () => {
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

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`);
    else {
      alert("Please provide a valid room id");
    }
  };

  useEffect(() => {}, []);
  return (
    <div>
      <NavbarHome />
      <Container className="grid gap-10  mt-5 grid-cols-2">
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
                <MicOff
                  className={
                    "text-white  rounded-full  p-1 bg-buttonPrimary"
                  }
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
                <Mic
                  className={
                    "text-white rounded-full p-1 bg-primary"
                  }
                  size={24}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div
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
      </div>
    </div>
  );
}
