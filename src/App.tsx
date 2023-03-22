import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Main from './components/Main'
// import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div style={baseSTyle}>
     <Main />
    </div>
  )
}

const baseSTyle={
  height:'100vh',
  width:'100vw',
  display: 'flex',
  alignItems:'center',
  justifyContent: 'center',
  backgroundColor:'white',
}

export default App
