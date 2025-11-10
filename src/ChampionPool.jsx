import React from "react";
import ChampionDisplay from './ChampionDisplay'

const ChampionPool = ({ champions }) => {

  return (
    <div className="champion-row">
        <p>Champion Pool</p>
        {champions.map((champ, index) => (
            <ChampionDisplay
            key={index}
            championName={champ.name}
            winRate={champ.winRate}
            />
        ))}
    </div>
  );
};

export default ChampionPool;