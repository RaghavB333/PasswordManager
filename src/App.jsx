import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <div className="bg-green-50 w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] min-h-[84.8vh]">
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
