import React from "react";
import ChampionDisplay from "./ChampionDisplay";

const Suggestions = ({ suggestions }) => {

  return (
    <div>
        <h2>Champion Suggestions: </h2>
        <div style = {{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            padding: "2rem"
        }}> 
        
        {suggestions.map((champ, index) => (
            <div key={index} style = {{
                display: "flex",
                flexDirection: "row",
                alignItems: "center", 
                gap: "2rem",
                padding: "2rem"
            }}>
                <ChampionDisplay championName={champ.name}/>
                <p>{champ.reason}</p>
            </div>
        ))}
        </div>
    </div>
  );
};

export default Suggestions;