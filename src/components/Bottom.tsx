import cx from "classnames";
import { Mic, Video, PhoneOff, MicOff, VideoOff, Phone } from "lucide-react";

import { IBottom } from "@/libs/interface";

const Bottom = (props: IBottom) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  const iconClass = "p-4 rounded-full text-white cursor-pointer bg-secondary";
  return (
    <div
      className={
        "absolute flex justify-between bottom-5 left-0 right-0 mx-auto w-[300px]"
      }
    >
      {muted ? (
        <MicOff
          className={cx(iconClass, "!bg-buttonPrimary")}
          size={55}
          onClick={toggleAudio}
        />
      ) : (
        <Mic className={iconClass} size={55} onClick={toggleAudio} />
      )}
      {playing ? (
        <Video className={iconClass} size={55} onClick={toggleVideo} />
      ) : (
        <VideoOff
          className={cx(iconClass, "!bg-buttonPrimary")}
          size={55}
          onClick={toggleVideo}
        />
      )}
      <div title="Leave Meeting">
      <Phone size={55} className={cx(iconClass, "active:!bg-buttonPrimary hover:bg-buttonPrimary")} onClick={leaveRoom} />
      </div>
    </div>
  );
};

export default Bottom;
