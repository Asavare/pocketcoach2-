import React, {useState} from 'react'

const sample = [
  {q:'Interest is charged on which of these?', opts:['Savings only','Loans only','Both','None'], a:2},
  {q:'Which is best for short-term saving?', opts:['Fixed deposit','Piggy bank','Daily trade','Long term bonds'], a:1},
  {q:'Budget = ?', opts:['Income - Expenses','Expenses - Income','Income + Expenses','None'], a:0}
]

export default function Quiz({profile, setProfile}){
  const [i, setI] = useState(0)
  const [score, setScore] = useState(null)

  function answer(idx){
    if(score!==null) return
    const correct = sample[i].a === idx
    if(correct) setProfile(p=>({...p, points: p.points + 5}))
    if(i < sample.length-1) setI(i+1)
    else setScore( (score||0) + (correct?1:0) )
  }

  if(score!==null) return <div className="card"><h3>Quiz</h3><p>Your score: {score}</p></div>
  const cur = sample[i]
  return (
    <div className="card">
      <h3>Daily Quiz</h3>
      <p>{cur.q}</p>
      <div className="options">
        {cur.opts.map((o,idx)=>(<button key={idx} onClick={()=>answer(idx)}>{o}</button>))}
      </div>
    </div>
  )
}
