import { IBottom } from "@/libs/interface";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import cx from "classnames";

export default function StreamStatus(props: IBottom) {
  const { muted, playing } = props;
  return (
    <div className="flex items-center gap-3">
      {muted ? (
        <MicOff className={"text-buttonPrimary"} size={20} />
      ) : (
        <Mic className={"text-primary"} size={20} />
      )}
      {playing ? (
        <Video className={"text-primary"} size={20} />
      ) : (
        <VideoOff className={"text-buttonPrimary"} size={20} />
      )}
    </div>
  );
}
