import './css/PoolPartyLoading.css'

export default function PoolPartyLoading({ type }) {
  return (
    <div className="pool-party-loading">
      <div className="sun"></div>
      <div className="waves">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      <div className="floatie">
        <div className="inner"></div>
      </div>
      <h2 className="loading-text">Diving into your {type}...</h2>
      <p className="tagline">Stay chill, Summoner!</p>
    </div>
  )
}
