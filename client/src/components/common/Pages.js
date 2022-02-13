import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from './Dashboard'
import Three from './Three'
import Two from './Two'
import Login from '../auth/Login'
import NotFound from './NotFound'

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/> 
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/two" element={<Two/>}/>
        <Route path="/three" element={<Three/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes> 
    </BrowserRouter>
  )
}

export default Pages