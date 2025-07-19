import React, { useState ,useEffect } from 'react'
import { Navbar } from './components/navbar'
import { Inp } from './components/inputtext'
import './App.css'

function App() {

useEffect(()=>{
  fetch('http://192.168.156.181:3000/tkn').then(async(res)=>{
    const json = await res.json()
    console.log(json)
    if (res.status == 200) 
      {
        localStorage.setItem("Token", json.token);
      }
  })
},[])
  return (
    <React.Fragment>  
      <Navbar></Navbar>
      <Inp></Inp>
    </React.Fragment>
  )
}

export default App
