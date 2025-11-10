import React from "react";
import ChampionDisplay from './ChampionDisplay'

const BlindPick = ({ blind }) => {

  return (
    <div className="champion-row">
        <h2>Best Blind Pick:</h2>
        <ChampionDisplay championName={blind}/>
        <p>{blind?.explanation}</p>
        
    </div>
  );
};

export default BlindPick;