import { useState } from 'react'
import './App.css'
import Homepage from "./Homepage"
import Quiz from "./Quiz"

export default function App() {
  const [isHomepage, setIsHomepage] = useState(true)

  return (
    <>
      {
        isHomepage ? <Homepage onSelect={setIsHomepage} /> : <Quiz />
      }
    </>
    
  )
}

 
