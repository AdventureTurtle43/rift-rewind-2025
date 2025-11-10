import React from "react";
import ChampionDisplay from "./ChampionDisplay";

const Suggestions = ({ suggestions }) => {

  return (
    <div className='suggestions'>
        <h2>Champion Suggestions: </h2>
        <div className='suggestion-box'>
        {suggestions.map((champ, index) => (
            <div key={index} className='suggestion'>
                <ChampionDisplay championName={champ.name}/>
                <p>{champ.reason}</p>
            </div>
        ))}
        </div>
    </div>
  );
};

export default Suggestions;