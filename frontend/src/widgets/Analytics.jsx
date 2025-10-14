import React, {useEffect, useRef} from 'react'
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js'
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale)

export default function Analytics({profile}){
  const pieRef = useRef(null), barRef = useRef(null)
  useEffect(()=>{
    const txns = JSON.parse(localStorage.getItem('pc_txns')||'[]')
    const categories = ['food','ent','travel','school','misc']
    const sums = categories.map(c=> txns.filter(t=>t.cat===c && t.type==='expense').reduce((s,x)=>s+x.amount,0))
    if(pieRef.current){
      new Chart(pieRef.current, {type:'pie', data:{labels:categories, datasets:[{data:sums}]}})
    }
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    const sample = days.map((d,i)=> (i+1)*10 )
    if(barRef.current){
      new Chart(barRef.current, {type:'bar', data:{labels:days, datasets:[{label:'Weekly spend', data:sample}]}})
    }
  },[])

  return (
    <div className="card small-widget">
      <h3>Insights</h3>
      <canvas ref={pieRef} style={{maxHeight:160}}/>
      <canvas ref={barRef} style={{maxHeight:160, marginTop:8}}/>
      <p className="muted">Quick visual summary of spending by category and weekly trend.</p>
    </div>
  )
}
