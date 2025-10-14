import React, {useState, useEffect} from 'react'

export default function Budget({profile, setProfile}){
  const [txns, setTxns] = useState(()=> JSON.parse(localStorage.getItem('pc_txns')||'[]'))
  const [amt,setAmt]=useState(''); const [desc,setDesc]=useState(''); const [cat,setCat]=useState('misc')

  useEffect(()=> localStorage.setItem('pc_txns', JSON.stringify(txns)), [txns])

  function add(type){
    const a = Number(amt); if(!a) return
    const t = {id:Date.now(), type, amount:a, desc, cat, date:new Date().toISOString()}
    setTxns(s=>[t,...s])
    setProfile(p=>({...p, balance: p.balance + (type==='income'?a:-a), points: p.points + (type==='income'? Math.floor(a/10):0)}))
    setAmt(''); setDesc('')
  }

  return (
    <div className="card small-widget">
      <h3>Wallet & Transactions</h3>
      <div className="wallet">Balance: <strong>₹{profile.balance}</strong></div>
      <div className="form-row">
        <input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="Amount" />
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" />
      </div>
      <div className="form-row">
        <select value={cat} onChange={e=>setCat(e.target.value)}>
          <option value="food">Food</option><option value="ent">Entertainment</option><option value="travel">Travel</option><option value="school">School</option><option value="misc">Misc</option>
        </select>
        <button onClick={()=>add('expense')}>Add Expense</button>
        <button onClick={()=>add('income')}>Add Income</button>
      </div>
      <div className="recent">
        <h4>Recent</h4>
        <ul>
          {txns.slice(0,6).map(t=>(<li key={t.id}>{new Date(t.date).toLocaleDateString()} • {t.desc||t.cat} • {t.type} ₹{t.amount}</li>))}
        </ul>
      </div>
    </div>
  )
}
