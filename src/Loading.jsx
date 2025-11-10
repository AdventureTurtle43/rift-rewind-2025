import './css/Loading.css'

export default function Loading({ type }) {
  return (
    <div className="loading">
      <div className="waves">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
      </div>
      <h2>🏖️Loading your {type}...🏐</h2>
    </div>
  )
}