import React, { useState, useRef } from 'react';

const ScreenRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<any>();

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    const mediaRecorderInstance = new MediaRecorder(stream);
    setMediaRecorder(mediaRecorderInstance);

    const recordedChunks: BlobPart[] | undefined = [];
    mediaRecorderInstance.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorderInstance.onstop = () => {
      const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
      const videoURL = URL.createObjectURL(recordedBlob);
      videoRef.current.src = videoURL;
    };

    mediaRecorderInstance.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Mulai Rekaman
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Rekaman
      </button>
      <video ref={videoRef} controls />
    </div>
  );
};

export default ScreenRecorder;
