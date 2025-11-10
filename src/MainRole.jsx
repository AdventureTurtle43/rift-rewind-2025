import React from "react";

const MainRole = ({ mainrole }) => {

  return (
    <div className='main-role'> 
        <h2>Main Role: </h2>
        <h3>{mainrole}</h3>
    </div>
  );
};

export default MainRole;