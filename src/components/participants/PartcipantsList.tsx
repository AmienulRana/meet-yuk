import { IPlayer } from "@/libs/interface";
import StreamStatus from "../StreamStatus";

export default function ParticipantsList({ muted, playing }: IPlayer){
    return (
        <div className="flex items-center bg-white px-5 my-[15px] py-2 rounded-full justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-primary justify-center w-10 h-10 rounded-full">
              <p className="text-white">A</p>
          </div>
          <span className="font-semibold text-base">Amienul Rana</span>
        </div>
          <StreamStatus muted={muted} playing={playing} />
      </div>
    )
}