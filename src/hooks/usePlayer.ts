import {useState} from 'react'
import { cloneDeep } from 'lodash'
import { useRouter } from 'next/router'
import { useSocket } from '@/context/SocketContext'

const usePlayer = (myId: string, roomId: string, peer:any) => {
    const socket = useSocket()
    const [players, setPlayers] = useState<any>({})
    const router = useRouter()
    const playersCopy = cloneDeep(players)
    const playerHighlighted = playersCopy[myId]
    delete playersCopy[myId]

    const nonHighlightedPlayers = playersCopy

    const leaveRoom = () => {
        socket?.emit('user-leave', myId, roomId)
        peer?.disconnect();
        // router.push('/')
        window.location.href = '/'
        // router.push('/home', undefined, { shallow: true, : true });
    }

    const toggleAudio = () => {
        setPlayers((prev: any) => {
            const copy = cloneDeep(prev)
            copy[myId].muted = !copy?.[myId]?.muted
            return {...copy}
        })
        socket?.emit('user-toggle-audio', myId, roomId)
    }

    const toggleVideo = () => {
        setPlayers((prev: any) => {
            const copy = cloneDeep(prev)
            copy[myId].playing = !copy?.[myId]?.playing
            return {...copy}
        })
        socket?.emit('user-toggle-video', myId, roomId)
    }

    return {players, setPlayers, playerHighlighted, nonHighlightedPlayers, toggleAudio, toggleVideo, leaveRoom}
}

export default usePlayer;