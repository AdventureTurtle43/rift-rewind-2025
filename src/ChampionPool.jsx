import React from "react";
import ChampionDisplay from './ChampionDisplay'

const ChampionPool = ({ champions }) => {

  return (
    <div className='champion-pool'>
    <h2>Champion Pool:</h2>
    <div className="champion-row">
        {champions.map((champ, index) => (
            <ChampionDisplay
            key={index}
            championName={champ.name}
            winRate={champ.winRate}
            />
        ))}
    </div>
    </div>
  );
};

export default ChampionPool;