import { cloneDeep } from "lodash";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const useMediaStream = () => {
  const [state, setState] = useState<MediaStream>();
  const isStreamSet = useRef(false);

  const initStream = async ({ video }: { video: boolean }) => {
    try {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      // console.log('parse the stream', JSON.stringify(Array.from(stream.getTracks())));
      // console.log('stream from useMedia', stream)
      setState(stream);
      return stream;
    } catch (e) {
      toast.error('System not allowed to get audio/video');
      console.log("Error in media navigator", e);
    }
  };

  useEffect(() => {
    if (isStreamSet.current) return;
    isStreamSet.current = true;
    initStream({ video: false });
  }, []);

  return {
    stream: state,
    handleOpenCamera: initStream,
  };
};

export default useMediaStream;
