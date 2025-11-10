import { useState } from 'react'
import MainRole from './MainRole'
import ChampionPool from './ChampionPool'
import MatchupWeaknesses from './MatchupWeaknesses'
import Suggestions from './Suggestions'
import BlindPick from './BlindPick'


function App() {
  const [name, setName] = useState("")
  const [tag, setTag] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [showData, updateshowData] = useState(false)

  const [championPool, setChampionPool] = useState([])

  const [weaknesses, setWeaknesses] = useState([])

  const [blindPick, setBlindPick] = useState()

  const [suggestions, setSuggestions] = useState([])

  const url = "https://b8mj01wn5e.execute-api.us-east-2.amazonaws.com/default/get-lol-match-stats";

  function submit(){
    updateshowData(true);
    setDisplayName(name);

    fetch("/championpool.json")
      .then((res) => res.json())
      .then((data) => setChampionPool(data))
      .catch((err) => console.error("Failed to load champions", err));

    fetch("/weaknesses.json")
      .then((res) => res.json())
      .then((data) => setWeaknesses(data))
      .catch((err) => console.error("Failed to load champions", err));

    fetch("/blindpick.json")
      .then((res) => res.json())
      .then((data) => setBlindPick(data))
      .catch((err) => console.error("Failed to load champions", err));

    fetch("/suggestions.json")
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.error("Failed to load champions", err));

    fetchStats();
  }

  async function fetchStats() {

    const res = await fetch(
      `${url}?gameName=${displayName}&tagLine=${tag}`
    );
    const data = await res.json();
    console.log(data); // championPoolStats JSON
  }

  return (
    <>
      <div style = {{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        padding: "2rem"
      }}> 

        <div>
          <h1>Name: {name}</h1>
          <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
          <input type='text' placeholder='#Tag' onChange={(e) => setTag(e.target.value)}/><br/>
          <button onClick={submit}>Submit</button>
        </div>

        {showData && championPool &&<ChampionPool champions={championPool}/>}

        {showData && <MainRole mainrole={"top"}></MainRole>}

        {showData && weaknesses && <MatchupWeaknesses champions={weaknesses}/>}

        {showData && suggestions && <Suggestions suggestions={suggestions}/>}

        {showData && blindPick && <BlindPick blind={blindPick}/>}
        
      </div>
    </>
  )
}

export default App
