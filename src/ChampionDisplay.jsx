import React from "react";

const ChampionDisplay = ({ championName, winRate }) => {
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/15.22.1/img/champion/${championName}.png`;

  return (
    <div>
      <h2>{championName}</h2>

      <img
        src={imageUrl}
        alt={championName}
      />
      {winRate && <p>{winRate}%</p>}
    </div>
  );
};

export default ChampionDisplay;