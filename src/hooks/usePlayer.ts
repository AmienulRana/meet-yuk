import {useEffect, useState} from 'react'
import { cloneDeep } from 'lodash'
import { useRouter } from 'next/router'
import { useSocket } from '@/context/SocketContext'
import useMediaStream from './useMediaStream'

const usePlayer = (myId: string, roomId: string, peer:any) => {
    const socket = useSocket();
    const {handleOpenCamera} = useMediaStream()
    const [players, setPlayers] = useState<any>({})
    const playersCopy = cloneDeep(players)
    let playerHighlighted = playersCopy[myId];
    delete playersCopy[myId]

    const nonHighlightedPlayers = playersCopy

    const leaveRoom = () => {
        socket?.emit('user-leave', myId, roomId)
        peer?.disconnect();
        window.location.href = '/'
    }

    const toggleAudio = () => {
        setPlayers((prev: any) => {
            const copy = cloneDeep(prev)
            copy[myId].muted = !copy?.[myId]?.muted
            return {...copy}
        })
        socket?.emit('user-toggle-audio', myId, roomId)
    }

    const toggleVideo = async () => {
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