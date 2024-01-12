import {useState, useEffect, useRef} from 'react'


const useMediaStream = () => {
    const [state, setState] = useState<MediaStream>()
    const isStreamSet = useRef(false)

    const initStream = async ({video}: {video:boolean}) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            })
            setState(stream);
            return stream;
        } catch (e) {
            console.log("Error in media navigator", e)
        }
    }

    useEffect(() => {
        if (isStreamSet.current) return;
        isStreamSet.current = true;
        initStream({ video: false })
    }, [])

    return {
        stream: state,
        handleOpenCamera: initStream
    }
}

export default useMediaStream