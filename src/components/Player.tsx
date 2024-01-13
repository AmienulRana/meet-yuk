import ReactPlayer from "react-player";
import cx from "classnames";
import { Mic, MicOff, UserSquare2 } from "lucide-react";

import styles from "@/component/Player/index.module.css";
import { IPlayer } from "@/libs/interface";

const Player = (props: IPlayer) => {
  const { url, muted, playing, isActive } = props;

  const config = {
    file: {
      attributes: {
        style: {
          objectFit: 'cover',
          height: '100%',
          width: '100%',
        },
      },
    },
  };
  return (
    <div
      className={cx(
        "relative overflow-hidden min-w-max  mb-5 bg-lightblue",
        {
          "rounded-md h-[140px] w-[150px] shadow-md": !isActive,
          "rounded-lg h-[60vh]": isActive,
          "flex items-center justify-center": !playing,
        }
      )}
    >
      <ReactPlayer
        url={url}
        volume={muted ? 0 : 1}
        muted={muted}
        playing={true}
        height={!isActive ? 140 : '100%'}
        width={!isActive ? 150 : '100%'}
        style={{ display: playing ? "block" : "none", objectFit: 'cover', transform: "scaleX(-1)" }}
        config={config}
      />
      {!playing && (
        <UserSquare2 className={"text-white"} size={isActive ? 400 : 150} />
      )}
      <div className={`flex justify-between items-center absolute w-full ${isActive ? 'bottom-5 left-5 max-w-[250px]' : 'bottom-2 left-2 max-w-[100px]'}`}>
        <p className="bg-[rgba(0,0,0,.3)] px-2 py-1 truncate text-xs text-white rounded-full">
          Joshep Adam
        </p>
      </div>

      {!isActive ? (
        muted ? (
          <MicOff
            className={"text-white absolute rounded-full   right-2 bottom-2 p-1 bg-buttonPrimary"}
            size={24}
          />
        ) : (
          <Mic className={"text-white absolute right-2 rounded-full bottom-2 p-1 bg-primary"} size={24} />
        )
      ) : undefined}
    </div>
  );
};

export default Player;
