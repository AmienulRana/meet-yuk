import cx from "classnames";
import {
  Mic,
  Video,
  PhoneOff,
  MicOff,
  VideoOff,
  Phone,
  Share,
} from "lucide-react";

import { IBottom } from "@/libs/interface";

const Bottom = (props: IBottom) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  const iconClass = "p-4 rounded-full text-white cursor-pointer bg-secondary";
  return (
    <div
      className={
        "fixed w-9/12 flex justify-center items-center gap-10 bg-white border-r border-lightgray py-3 bottom-0 left-0 right-0"
      }
    >
      {muted ? (
        <MicOff
          className={cx(iconClass, "!bg-buttonPrimary")}
          size={55}
          onClick={toggleAudio}
        />
      ) : (
        <Mic
          className={cx(iconClass, "!bg-primary")}
          size={55}
          onClick={toggleAudio}
        />
      )}
      {playing ? (
        <Video
          className={cx(iconClass, "!bg-primary")}
          size={55}
          onClick={toggleVideo}
        />
      ) : (
        <VideoOff
          className={cx(iconClass, "!bg-buttonPrimary")}
          size={55}
          onClick={toggleVideo}
        />
      )}
      <div title="Share screen">
        <Share
          size={55}
          className={cx(iconClass, "!bg-lightblue !text-primary")}
        />
      </div>
      <div onClick={leaveRoom} title="Leave Meeting" className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-5">
        <p className="text-white bg-buttonPrimary rounded-full flex items-center justify-center text-sm px-4 py-1.5">
          Leave Meet
        </p>
      </div>
    </div>
  );
};

export default Bottom;
