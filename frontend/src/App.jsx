import React, {useState, useEffect} from 'react'
import Dashboard from './views/Dashboard'
import Auth from './views/Auth'
import './styles.css'

export default function App(){
  const [user, setUser] = useState(()=> {
    try{ return JSON.parse(localStorage.getItem('pc_user')) }catch(e){ return null }
  })

  useEffect(()=> localStorage.setItem('pc_user', JSON.stringify(user)), [user])

  return (
    <div className='app-root'>
      {user ? <Dashboard user={user} setUser={setUser}/> : <Auth onLogin={setUser}/>}
    </div>
  )
}
