import { useState } from 'react'

function App() {
  const [name, setName] = useState("")
  const [tag, setTag] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [showWelcome, updateShowWelcome] = useState(false)

  function submit(){
    updateShowWelcome(true);
    setDisplayName(name);
  }

  return (
    <>
      <div>
        <h1>Name: {name}</h1>
        <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        <input type='text' placeholder='#Tag' onChange={(e) => setTag(e.target.value)}/><br/>
        <button onClick={submit}>Submit</button>
        {showWelcome && <p>Welcome {displayName}</p>}
      </div>
    </>
  )
}

export default App
