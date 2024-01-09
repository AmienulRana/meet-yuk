import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/router"

import  { useState, useEffect, useRef } from  "react"

const usePeer = () => {
    const socket = useSocket()
    const roomId = useRouter().query.roomId;
    const [peer, setPeer] = useState<any>(null)
    const [myId, setMyId] = useState('')
    const isPeerSet = useRef(false)

    useEffect(() => {
        // console.log('perr');
        if (isPeerSet.current) return;
        isPeerSet.current = true;
        let myPeer;
        (async function initPeer() {
            myPeer = new (await import('peerjs')).default()
            setPeer(myPeer)
            
            myPeer.on('open', (id) => {
                console.log(`your peer id is ${id}`)
                // setMyId(id)
                // socket?.emit('join-room', roomId, id)
            })
        })()
    }, [])

    return {
        peer,
        myId
    }
}

export default usePeer;