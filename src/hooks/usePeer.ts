import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/router"

import  { useState, useEffect, useRef } from  "react"
import { useUsername } from "./useUsername";

const usePeer = () => {
    const socket = useSocket()
    const roomId = useRouter().query.roomId;
    const [peer, setPeer] = useState<any>(null)
    const [myId, setMyId] = useState('');
    const isPeerSet = useRef(false);

    const {username} = useUsername();

    useEffect(() => {

        if (isPeerSet.current || !roomId || !socket) return;
        isPeerSet.current = true;
        let myPeer;
        (async function initPeer() {
            myPeer = new (await import('peerjs')).default()
            setPeer(myPeer)
            
            const getMyPeer = sessionStorage.getItem('my-id');

            if(!getMyPeer){
                myPeer.on('open', (id) => {
                    console.log(`your peer id is ${id}`)
                    setMyId(id);
                    sessionStorage.setItem('my-id', id);
                    socket?.emit('join-room', roomId, {userId:id, username});
                    // socket?.emit('join-chat', roomId, username);
                })
            }else{ 
                console.log(`your peer id is ${getMyPeer}`)
                    setMyId(getMyPeer);
                    sessionStorage.setItem('my-id', getMyPeer);
                    socket?.emit('join-room', roomId, {userId:getMyPeer, username});
            }
        })()
    }, [roomId, socket])

    return {
        peer,
        myId
    }
}

export default usePeer;