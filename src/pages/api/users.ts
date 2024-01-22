import connectMongo from '@/libs/connectDb';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import Users from '@/models/users';
import { User } from 'lucide-react';
import Room from '@/models/room';

export default async function room(req: NextApiRequest, res: NextApiResponse) {
    await connectMongo();
  if (req.method === 'POST') {
    try {
        const findUserId = await Users.findOne({myId: req?.body?.myId});
        if(!findUserId){
          const newUser = await new Users({...req.body});
          newUser?.save();
          return res.status(200).json({message: 'Successfully created new user'})
        }
        return res.status(409).json({message: 'User already created'})
    } catch (error) {
      console.log(error);
        return res.status(500).json({message:'Failed to create new user'});
    }
  } else if(req.method === 'PUT') {
    try {
        const { muted, playing, myId } = req.query;
        const document = await Users.findOne({ myId: myId });
        if(muted){
          const updateMic = await Users.updateOne({myId: req.query?.myId}, {$set: { muted: !document?.muted}});
          console.log(updateMic);
        }else if(playing){
          const updateStream = await Users.updateOne({myId: req.query?.myId}, {$set: { playing: !document?.playing}});
          console.log(updateStream);
        }
        return res.status(200).json({message: `Successfully Toggle your stream`})        
    } catch (error: any) {
        return res.status(500).json({message:'Failed to find room'});
    }
  }else if(req.method === 'DELETE'){
    try {
      const document = await Users.findOne({ myId: req.query?.myId });
      const totalUserRoom = await Users.find({roomId: document?.roomId});
      if(totalUserRoom?.length === 1){
        const deleteRoom = await Room.deleteOne({_id: document.roomId});
      }
      const deleteUser = await Users.deleteOne({myId: req.query?.myId});
      res.status(200).json({message: 'Successfully Delete user'});
    } catch (error) {
      return res.status(500).json({message:'Failed to get all user'});
    }
  }
  else {
    try {
      const findAllUser = await Users.find({roomId: req.query?.roomId});
      res.status(200).json(findAllUser);
    } catch (error) {
      return res.status(500).json({message:'Failed to get all user'});
    }
  }
}