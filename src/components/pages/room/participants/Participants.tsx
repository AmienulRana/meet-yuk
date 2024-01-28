import { Fragment } from "react";
import ParticipantsList from "./PartcipantsList";
import { ChevronDown } from "lucide-react";
import { create } from "zustand";



type Store = {
  showParticipant: boolean;
  toggleParticipant: () => void
}

export const useShowParticipant = create<Store>()((set) => ({
  showParticipant: true,
  toggleParticipant: () => set((state) => ({ showParticipant: !state.showParticipant })),
}))

export default function Participants({ players }: { players: any }) {
  const { toggleParticipant, showParticipant } = useShowParticipant();
  return (
    <div className="flex-1">

      <div className="flex justify-between items-center bg-white px-5 py-3"> 
      <h2 className="text-lg font-semibold ">
        Participants {players && `(${Object.keys(players)?.length})`}
      </h2>
      <ChevronDown size={25} onClick={toggleParticipant} className={`duration-300 ${showParticipant ? 'rotate-0' : 'rotate-180'}`}/>
      </div>
      <div className={`px-4 custom-scrollbar duration-300 overflow-y-auto ${showParticipant ? 'h-[235px]' : 'h-0'}`}>
        {Object.keys(players).map((playerId) => {
          const { muted, playing, username, color } = players[playerId];
          return (
            <ParticipantsList
              muted={muted}
              playing={playing}
              key={playerId}
              username={username}
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
}
