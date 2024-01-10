import ReactPlayer from "react-player";
import cx from "classnames";
import { Mic, MicOff, UserSquare2 } from "lucide-react";

import styles from "@/component/Player/index.module.css";
import { IPlayer } from "@/libs/interface";

const Player = (props: IPlayer) => {
  const { url, muted, playing, isActive } = props;
  return (
    <div
      className={cx('relative overflow-hidden mb-5 h-full', {
        'rounded-md h-min shadow-md w-[200px]': !isActive,
        'rounded-lg': isActive,
        'flex items-center justify-center': !playing,
      })}
    >
      {playing ? (
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width="100%"
          height="100%"
        />
      ) : (
        <UserSquare2 className={'text-white'} size={isActive ? 400 : 150} />
      )}

      {!isActive ? (
        muted ? (
          <MicOff className={'text-white absolute right-2 bottom-2'} size={20} />
        ) : (
          <Mic className={'text-white absolute right-2 bottom-2'} size={20} />
        )
      ) : undefined}
    </div>
  );
};

export default Player;