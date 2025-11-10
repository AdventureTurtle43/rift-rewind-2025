import React from "react";
import ChampionDisplay from './ChampionDisplay'

const MatchupWeaknesses = ({ champions }) => {

  return (
    <div>
      <h2>Matchup Weaknesses:</h2>
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

export default MatchupWeaknesses;