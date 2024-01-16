import connectMongo from '@/libs/connectDb';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import Room from '@/models/room';

export default async function room(req: NextApiRequest, res: NextApiResponse) {
    await connectMongo();
  if (req.method === 'POST') {
    try {
        const newRoom = await new Room({name:  req.body.roomName});
        newRoom?.save();
        console.log(newRoom);
        return res.status(200).json({message: 'Successfully Created New Room', room: newRoom})
        
    } catch (error) {
        return res.status(500).json({message:'Failed to create new room'});
    }
  } else if(req.method === 'PUT') {
    try {
        const findRoom = await Room.findById({_id:  req.query?.id});
        console.log(findRoom);
        return res.status(200).json({message: `Find room with id ${req.query?.id}`, room: findRoom})        
    } catch (error: any) {
        return res.status(500).json({message:'Failed to find room'});
    }
    // Handle any other HTTP method
  }
}