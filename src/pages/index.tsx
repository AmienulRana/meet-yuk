import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSocket } from '@/context/SocketContext'
import { useEffect } from 'react';
import usePeer from '@/hooks/usePeer';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const socket = useSocket();
  usePeer();

  useEffect(() => {
    socket?.on('connect', () => {
      // console.log(socket?.id)
    })
  }, [socket])
  return (  
      <h1>Welcome</h1>
  )
}
