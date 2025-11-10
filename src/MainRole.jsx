import React from "react";

const MainRole = ({ mainrole }) => {

  return (
    <div style = {{
        display: "flex",
        flexDirection: "row",   // stack children vertically
        alignItems: "center",      // center horizontally
        gap: "2rem",               // spacing between sections
        padding: "2rem"
      }}> 
        <h2>Main Role: </h2>
        <h2>{mainrole}</h2>
    </div>
  );
};

export default MainRole;