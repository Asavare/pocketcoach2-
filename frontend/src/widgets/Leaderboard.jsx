import React, {useState, useEffect} from 'react'

export default function Leaderboard({profile}){
  const [peers, setPeers] = useState(()=> JSON.parse(localStorage.getItem('pc_peers')||'[]'))

  useEffect(()=>{
    // Ensure current user exists in peers for demo
    if(!peers.find(p=>p.email===profile.email)){
      const p = {name: profile.name, email: profile.email, points: profile.points || 0}
      const updated = [p, ...peers].slice(0,10)
      setPeers(updated); localStorage.setItem('pc_peers', JSON.stringify(updated))
    }
  },[])

  return (
    <div className="card small-widget">
      <h3>Leaderboard</h3>
      <ol>
        {peers.map((p,idx)=>(<li key={p.email}>{p.name} — {p.points} pts</li>))}
      </ol>
      <p className="muted">This demo shows peers stored locally. Connect to backend to share leaderboards.</p>
    </div>
  )
}
