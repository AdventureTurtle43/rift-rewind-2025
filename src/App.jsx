import { useState } from 'react'
import MainRole from './MainRole'
import ChampionPool from './ChampionPool'
import MatchupWeaknesses from './MatchupWeaknesses'
import Suggestions from './Suggestions'
import BlindPick from './BlindPick'
import "./css/App.css"
import Header from './Header'


function App() {
  const [name, setName] = useState("")
  const [tag, setTag] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [showData, updateshowData] = useState(false)

  const [championPool, setChampionPool] = useState([])

  const [weaknesses, setWeaknesses] = useState([])

  const [blindPick, setBlindPick] = useState()

  const [suggestions, setSuggestions] = useState([])

  const [role, setRole] = useState()

  const statsUrl = "https://b8mj01wn5e.execute-api.us-east-2.amazonaws.com/default/get-lol-match-stats";
  const aiUrl = "https://xxztde05lc.execute-api.us-east-2.amazonaws.com/default/suggestion-strands-agent";

  function submit(){
    updateshowData(true);
    setDisplayName(name);

    fetch("/blindpick.json")
      .then((res) => res.json())
      .then((data) => setBlindPick(data))
      .catch((err) => console.error("Failed to load champions", err));

    fetchStats();
  }

  async function fetchStats() {

    const res = await fetch(
      `${statsUrl}?gameName=${name}&tagLine=${tag}`
    );
    const data = await res.json();

    setChampionPool(data.championPoolStats);
    setWeaknesses(data.enemyLanerWins);
    setRole(data.mainRole);

    console.log(data);
    fetchAiSummary();
  }

  async function fetchAiSummary() {
    let prompt = `Please suggest new champions for player.     Player match history:    Player is a ${role} main    `
    console.log(championPool[0].name)
    for(champ of championPool){
      prompt += `On champion ${champ.name}, player has ${champ.games} played with a ${champ.winRate} percent win rate        `
    }

    for(champ of weaknesses){
      prompt += `Against champion ${champ.name}, player has ${champ.games} played against them with a ${champ.winRate} percent win rate against them        `
    }

    console.log(prompt)
    const res = await fetch(
      `${aiUrl}?prompt=${prompt}`
    );
    const data = await res.json();

    setSuggestions(data.suggestions);
  }

  return (
    <>
      <Header/>
      <div className="page"> 
        <div className='summoner-input'>
          <h2>Summoner Name: {name}</h2>
          <div>
            <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
            <input type='text' placeholder='#Tag' onChange={(e) => setTag(e.target.value)}/>
            <button onClick={submit}>Submit</button>
          </div>
        </div>

        {showData && championPool &&<ChampionPool champions={championPool}/>}

        {showData && <MainRole mainrole={role}></MainRole>}

        {showData && weaknesses && <MatchupWeaknesses champions={weaknesses}/>}

        {showData && suggestions && <Suggestions suggestions={suggestions}/>}

        {showData && blindPick && <BlindPick blind={blindPick}/>}
        
      </div>
    </>
  )
}

export default App
