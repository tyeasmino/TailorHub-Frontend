import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Index from './route/Index'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <> 
        <div className=' dark:bg-dark  dark:text-white'>
          <Index />
        </div> 
    </>
  )
}

export default App
