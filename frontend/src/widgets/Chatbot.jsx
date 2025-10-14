import React, {useState} from 'react'

// A lightweight rule-based "AI" chatbot for demo. Replace with Dialogflow/Rasa for real NLU.
export default function Chatbot({profile, setProfile}){
  const [msgs, setMsgs] = useState([{from:'bot', text:`Hi ${profile.name} — I'm PocketCoach! Ask me for tips or say 'plan for laptop'`}])
  const [q, setQ] = useState('')

  function push(msg){ setMsgs(m=>[...m, msg]) }

  function replyTo(text){
    const t = text.toLowerCase()
    if(t.includes('plan') || t.includes('save') || t.includes('laptop') || t.includes('phone')){
      push({from:'bot', text:'Budget plan: set a weekly target and automate small saves. Try: save 200'})
    } else if(t.includes('save ')){
      const n = Number(t.split('save ')[1]) || 0
      if(n>0 && profile.balance>=n){
        setProfile(p=>({...p, balance: p.balance - n, points: p.points + Math.floor(n/10)}))
        push({from:'bot', text:`Saved ₹${n}. Points +${Math.floor(n/10)} — great habit!`})
      } else push({from:'bot', text:'Not enough balance or invalid amount.'})
    } else if(t.includes('quiz')){
      push({from:'bot', text:'Try the Quiz section for daily challenges — earn XP!' })
    } else if(t.includes('insight') || t.includes('analytics')){
      push({from:'bot', text:'Open Analytics to see spending trends and tips.'})
    } else {
      push({from:'bot', text:"I can help with saving plans, goals, quizzes, and stories. Try 'save 100' or 'plan for laptop'."})
    }
  }

  function send(e){
    e.preventDefault()
    if(!q.trim()) return
    push({from:'user', text:q})
    setTimeout(()=> replyTo(q), 400)
    setQ('')
  }

  return (
    <div className="card small-widget">
      <h3>Coach Chat</h3>
      <div className="chat-window">
        {msgs.map((m,i)=>(<div key={i} className={'chat-msg '+m.from}><span>{m.text}</span></div>))}
      </div>
      <form onSubmit={send} className="chat-compose">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask the coach..." />
        <button>Send</button>
      </form>
    </div>
  )
}
