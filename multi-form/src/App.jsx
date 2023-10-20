import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar />
    </>
  )
}

function Sidebar() {
  return (
    <div className='sidebar'>
      <Barstep number="1" info="YOUR INFO"></Barstep>
      <Barstep number="2" info="SELECT PLAN"></Barstep>
      <Barstep number="3" info="ADD-ONS"></Barstep>
      <Barstep number="4" info="SUMMERY"></Barstep>
    </div>
  )
}

function Barstep(props) {
  return (
    <div className='step-container'>
      <p>{props.number}</p>
      <div className='step-info-container'>
        <p>step {props.number}</p>
        <p>{props.info}</p>
      </div>
    </div> 
  )
}

export default App
