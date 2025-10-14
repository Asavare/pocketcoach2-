import React, {useState} from 'react'
import stories from '../../data/stories.json'

export default function Stories({profile, setProfile}){
  const [i, setI] = useState(0)
  const s = stories[i]
  function choose(opt){
    if(opt.effect?.money) setProfile(p=>({...p, balance: p.balance + opt.effect.money, points: p.points + (opt.effect.points||0)}))
    if(opt.effect?.badge) setProfile(p=>({...p, badges: Array.from(new Set([...(p.badges||[]), opt.effect.badge]))}))
    setI(idx => Math.min(idx+1, stories.length-1))
  }
  return (
    <div className="card">
      <h3>Interactive Stories</h3>
      <p className="muted">Play short life scenarios and learn consequences</p>
      <div className="story">
        <h4>{s.title}</h4>
        <p>{s.text}</p>
        <div className="options">
          {s.options.map((o,idx)=>(<button key={idx} onClick={()=>choose(o)}>{o.text}</button>))}
        </div>
      </div>
    </div>
  )
}
