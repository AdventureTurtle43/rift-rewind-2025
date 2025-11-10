import React from "react";
import ChampionDisplay from './ChampionDisplay'

const MatchupWeaknesses = ({ champions }) => {

  return (
    <div className="champion-row">
        <p>Matchup Weaknesses</p>
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

export default MatchupWeaknesses;