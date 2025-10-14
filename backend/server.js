const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.json())

const DATA = path.join(__dirname, '..', 'data')
if(!fs.existsSync(DATA)) fs.mkdirSync(DATA, {recursive:true})

function read(file, def){ try{ return JSON.parse(fs.readFileSync(path.join(DATA,file))) }catch(e){ return def } }
function write(file, obj){ fs.writeFileSync(path.join(DATA,file), JSON.stringify(obj,null,2)) }

// init sample
if(!fs.existsSync(path.join(DATA,'users.json'))){
  write('users.json', [{id:1,name:'Alex',email:'teen@example.com',password:'pass',balance:1000,points:0,badges:[]}])
}
if(!fs.existsSync(path.join(DATA,'stories.json'))){
  write('stories.json', require('./../frontend/data/stories.json'))
}
if(!fs.existsSync(path.join(DATA,'txns.json'))){ write('txns.json', []) }
if(!fs.existsSync(path.join(DATA,'goals.json'))){ write('goals.json', []) }

app.post('/api/login', (req,res)=>{
  const {email,password} = req.body
  const users = read('users.json', [])
  const u = users.find(x=>x.email===email && x.password===password)
  if(!u) return res.status(401).json({error:'invalid'})
  res.json({ok:true, user: u})
})

app.get('/api/stories', (req,res)=> res.json(read('stories.json', [])))
app.get('/api/state', (req,res)=> res.json({
  users: read('users.json', []),
  txns: read('txns.json', []),
  goals: read('goals.json', [])
}))

app.post('/api/tx', (req,res)=>{
  const txns = read('txns.json', [])
  const t = {...req.body, id: Date.now(), date: new Date().toISOString()}
  txns.unshift(t); write('txns.json', txns)
  res.json({ok:true, tx: t})
})

app.post('/api/goal', (req,res)=>{
  const goals = read('goals.json', [])
  const g = {...req.body, id: Date.now()}
  goals.unshift(g); write('goals.json', goals)
  res.json({ok:true, goal:g})
})

app.get('/api/leaderboard', (req,res)=>{
  const users = read('users.json', [])
  const sorted = users.sort((a,b)=> (b.points||0)-(a.points||0)).slice(0,10)
  res.json(sorted)
})

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log('PocketCoach backend listening on', port))
