import React from "react";

const ChampionDisplay = ({ championName, winRate }) => {
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/15.22.1/img/champion/${championName}.png`;

  return (
    <div className='champion-display'>
      <h3>{championName}</h3>
      <img
        src={imageUrl}
        alt={championName}
        className='champion-icon'
      />
      {winRate && <p className={winRate < 50 ? 'red-text' : 'green-text'}>
  {winRate}%
</p>}
    </div>
  );
};

export default ChampionDisplay;