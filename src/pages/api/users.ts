import connectMongo from '@/libs/connectDb';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import Users from '@/models/users';
import { User } from 'lucide-react';

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
    // try {
    //     const findRoom = await Room.findById({_id:  req.query?.id});
    //     console.log(findRoom);
    //     return res.status(200).json({message: `Find room with id ${req.query?.id}`, room: findRoom})        
    // } catch (error: any) {
    //     return res.status(500).json({message:'Failed to find room'});
    // }
    // Handle any other HTTP method
  }else if(req.method === 'DELETE'){
    try {
      const deleteUser = await Users.findOneAndDelete({myId: req.query?.myId});
      console.log(deleteUser);
      res.status(200).json({message: 'Successfully Delete user'});
    } catch (error) {
      return res.status(500).json({message:'Failed to get all user'});
    }
  }
  else {
    try {
      const findAllUser = await Users.find({roomId: req.query?.roomId});
      console.log(findAllUser);
      res.status(200).json(findAllUser);
    } catch (error) {
      return res.status(500).json({message:'Failed to get all user'});
    }
  }
}