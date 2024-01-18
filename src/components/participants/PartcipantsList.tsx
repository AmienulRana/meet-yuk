import { IPlayer } from "@/libs/interface";
import StreamStatus from "../StreamStatus";
import Avatar from "../Avatar";

export default function ParticipantsList({ muted, playing, username, color }: IPlayer){
    return (
        <div className="flex items-center bg-white px-5 my-[15px] py-2 rounded-full justify-between">
        <div className="flex items-center gap-3">
          <Avatar text={username || 'A'} color={color} />
          <span className="font-semibold text-base">{username}</span>
        </div>
          <StreamStatus muted={muted} playing={playing} />
      </div>
    )
}