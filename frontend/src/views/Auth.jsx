import React, {useState} from 'react'

export default function Auth({onLogin}){
  const [name, setName] = useState('Alex')
  const [email, setEmail] = useState('teen@example.com')
  const [mode, setMode] = useState('signin') // signin/signup

  function submit(e){
    e.preventDefault()
    // Simple mock auth: store user locally for demo
    const user = {id: Date.now(), name, email, balance:1000, points:0, badges:[], level:1}
    onLogin(user)
  }

  return (
    <div className="auth-screen card">
      <h2>Welcome to PocketCoach</h2>
      <p className="muted">A friendly financial coach for teens — demo mode</p>
      <form onSubmit={submit} className="auth-form">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <div className="form-row">
          <button type="submit">{mode==='signin'?'Sign in (demo)':'Sign up (demo)'}</button>
          <button type="button" className="ghost" onClick={()=>setMode(m=>m==='signin'?'signup':'signin')}>{mode==='signin'?'Create account':'Back to sign in'}</button>
        </div>
      </form>
      <small className="muted">This demo stores data in your browser. For production, integrate Firebase/Supabase.</small>
    </div>
  )
}
