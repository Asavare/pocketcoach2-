import React, {useState} from 'react'

export default function Goals({profile, setProfile}){
  const [goals, setGoals] = useState(()=> JSON.parse(localStorage.getItem('pc_goals')||'[]'))
  const [name,setName]=useState(''); const [target,setTarget]=useState('')

  function add(){
    const t = Number(target); if(!name||!t) return
    const g = {id:Date.now(), name, target:t, saved:0}
    setGoals(s=>[g,...s]); localStorage.setItem('pc_goals', JSON.stringify([g,...goals]))
    setName(''); setTarget('')
  }
  function contribute(id, amt){
    const a = Number(amt); if(!a) return
    setGoals(gs=> gs.map(g=> g.id===id? {...g, saved: g.saved + a} : g))
    setProfile(p=>({...p, balance: p.balance - a, points: p.points + Math.floor(a/10)}))
  }

  return (
    <div className="card">
      <h3>Goals & Savings</h3>
      <div className="form-row">
        <input placeholder="Goal name" value={name} onChange={e=>setName(e.target.value)}/>
        <input placeholder="Target" value={target} onChange={e=>setTarget(e.target.value)}/>
        <button onClick={add}>Create Goal</button>
      </div>
      <ul>
        {goals.map(g=>(
          <li key={g.id}>
            <div className="goal-line">
              <strong>{g.name}</strong> — ₹{g.saved} / ₹{g.target}
              <div className="goal-actions">
                <input id={'c'+g.id} placeholder="amt"/>
                <button onClick={()=>contribute(g.id, document.getElementById('c'+g.id).value)}>Contribute</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
