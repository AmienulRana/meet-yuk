import connectMongo from "@/libs/connectDb";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Chats from "@/models/chats";

export default async function room(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();
  if (req.method === "POST") {
    try {
      const newChat = await new Chats({
        ...req.body,
      });
      newChat?.save().then((res: any) => console.log(res));
      return res.status(200).json({ message: "Successfully send new message" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to send new room" });
    }
  } else if (req.method === "GET") {
    try {
      console.log(req?.query);
      const getAllChats = await Chats.find();
      console.log("get all chat", getAllChats);
      return res
        .status(200)
        .json(getAllChats);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Failed to find room", error: error });
    }
  }
}
