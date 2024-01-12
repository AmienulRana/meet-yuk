import ReactPlayer from "react-player";
import cx from "classnames";
import { Mic, MicOff, UserSquare2 } from "lucide-react";

import styles from "@/component/Player/index.module.css";
import { IPlayer } from "@/libs/interface";

const Player = (props: IPlayer) => {
  const { url, muted, playing, isActive } = props;
  return (
    <div
      className={cx(
        "relative overflow-hidden mb-5 h-[60vh] w-full bg-lightblue",
        {
          "rounded-md h-min shadow-md w-[200px]": !isActive,
          "rounded-lg": isActive,
          "flex items-center justify-center": !playing,
        }
      )}
    >
      <ReactPlayer
        url={url}
        muted={muted}
        playing={true}
        width="100%"
        height="100%"
        style={{ display: playing ? "block" : "none" }}
      />
      {!playing && (
        <UserSquare2 className={"text-white"} size={isActive ? 400 : 150} />
      )}
      <div className="flex justify-between items-center absolute bottom-5 left-5 w-full">
        <p className="bg-[rgba(0,0,0,.3)] px-2 py-1 text-xs text-white rounded-full">
          Joshep Adam
        </p>
      </div>

      {!isActive ? (
        muted ? (
          <MicOff
            className={"text-white absolute right-2 bottom-2"}
            size={20}
          />
        ) : (
          <Mic className={"text-white absolute right-2 bottom-2"} size={20} />
        )
      ) : undefined}
    </div>
  );
};

export default Player;
