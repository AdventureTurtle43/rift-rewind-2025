import { useState } from 'react'
import MainRole from './MainRole'
import ChampionPool from './ChampionPool'
import MatchupWeaknesses from './MatchupWeaknesses'
import Suggestions from './Suggestions'
import BlindPick from './BlindPick'
import "./css/App.css"
import Header from './Header'
import Loading from './Loading'
import PoolPartyLoading from './PoolPartyLoading.jsx'


function App() {
  const [name, setName] = useState("")
  const [tag, setTag] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [showData, updateshowData] = useState(false)

  const [championPool, setChampionPool] = useState([])

  const [weaknesses, setWeaknesses] = useState([])

  const [blindPick, setBlindPick] = useState("")

  const [suggestions, setSuggestions] = useState([])

  const [role, setRole] = useState("")

  const [isLoadingPool, setIsLoadingPool] = useState(true);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);


  const statsUrl = "https://twqcv7u7x5ljbrzpgovckj4ysi0ntzfz.lambda-url.us-east-2.on.aws/";
  const aiUrl = "https://napmkowzddccf4ftyul72tmzgy0uwhbj.lambda-url.us-east-2.on.aws/";

  function submit(){
    updateshowData(true);
    setDisplayName(name);

    fetchStats();
  }

  async function fetchStats() {
    setIsLoadingPool(true);
    const res = await fetch(
      `${statsUrl}?gameName=${name}&tagLine=${tag}`
    );
    const data = await res.json();

    setChampionPool(data.championPoolStats);
    setWeaknesses(data.enemyLanerWins);
    setRole(data.mainRole);
    setIsLoadingPool(false);
    setIsLoadingSuggestions(true);
    fetchAiSummary(data.championPoolStats, data.enemyLanerWins, data.mainRole);
  }

  async function fetchAiSummary(responseChampionPool, responseWeaknesses, responseRole) {
    let prompt = `Please suggest new champions for player.     Player match history:    Player is a ${responseRole} main    `
    for(const champ of responseChampionPool){
      prompt += `On champion ${champ.name}, player has ${champ.games} played with a ${champ.winRate} percent win rate        `
    }

    for(const champ of responseWeaknesses){
      prompt += `Against champion ${champ.name}, player has ${champ.games} played against them with a ${champ.winRate} percent win rate against them        `
    }

    console.log(prompt)
    const res = await fetch(
      `${aiUrl}?prompt=${prompt}`
    );
    const data = await res.json();

    setSuggestions(data.suggestions.suggestions);
    setIsLoadingSuggestions(false);
    setBlindPick(data.blindPick.name);
    console.log(data.blindPick)
    console.log(data.blindPick.name)
  }

  return (
    <>
      <Header/>
      <div className="page"> 
        <div className='summoner-input'>
          <h2>Summoner Name: <span className="summoner-name">{name}</span></h2>
          <div>
            <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
            <input type='text' placeholder='#Tag' onChange={(e) => setTag(e.target.value)}/>
            <button onClick={submit}>Submit</button>
          </div>
        </div>
        {showData && !isLoadingPool && role && <MainRole mainrole={role}></MainRole>}
        {showData && !isLoadingPool && championPool &&<ChampionPool champions={championPool}/>}
        {showData && !isLoadingPool && weaknesses && <MatchupWeaknesses champions={weaknesses}/>}
        {showData && isLoadingPool && <Loading type="Champion Pool"></Loading>}

        {showData && !isLoadingSuggestions && suggestions && <Suggestions suggestions={suggestions}/>}
        {showData && !isLoadingSuggestions && blindPick && <BlindPick blind={blindPick}/>}
        {showData && isLoadingSuggestions && <Loading type='Suggestions'></Loading>}
        
      </div>
    </>
  )
}

export default App
