import React, {useState, useEffect} from 'react'
import Chatbot from '../widgets/Chatbot'
import Stories from '../widgets/Stories'
import Budget from '../widgets/Budget'
import Goals from '../widgets/Goals'
import Analytics from '../widgets/Analytics'
import Leaderboard from '../widgets/Leaderboard'
import Quiz from '../widgets/Quiz'

export default function Dashboard({user, setUser}){
  const [profile, setProfile] = useState(()=> {
    const p = JSON.parse(localStorage.getItem('pc_profile'))
    return p && p.email===user.email ? p : {...user}
  })

  useEffect(()=> localStorage.setItem('pc_profile', JSON.stringify(profile)), [profile])

  function logout(){ setUser(null); localStorage.removeItem('pc_profile') }

  return (
    <div className="dashboard">
      <header className="topbar card">
        <div className="brand"><h1>PocketCoach</h1><small>Financial life coach for teens</small></div>
        <div className="top-actions">
          <div className="user-pill">{profile.name} • ₹{profile.balance}</div>
          <button className="ghost" onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="grid">
        <section className="col-lg">
          <Stories profile={profile} setProfile={setProfile}/>
          <Goals profile={profile} setProfile={setProfile}/>
          <Quiz profile={profile} setProfile={setProfile}/>
        </section>
        <aside className="col-sm">
          <Chatbot profile={profile} setProfile={setProfile}/>
          <Budget profile={profile} setProfile={setProfile}/>
          <Analytics profile={profile}/>
          <Leaderboard profile={profile}/>
        </aside>
      </main>
    </div>
  )
}
