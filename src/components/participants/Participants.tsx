import { Fragment } from "react";
import ParticipantsList from "./PartcipantsList";

export default function Participants({ players }: { players: any }) {
  return (
    <div className="flex-1">
      <h2 className="text-lg font-semibold bg-white px-5 py-3">Participants {players &&  `(${Object.keys(players)?.length})`}</h2>
      <div className="px-4 custom-scrollbar overflow-y-auto h-[235px]">
        {Object.keys(players).map((playerId) => {
          const { muted, playing, username } = players[playerId];
          return (
                <ParticipantsList muted={muted} playing={playing} key={playerId} username={username} />               
          );
        })}
      </div>
    </div>
  );
}
