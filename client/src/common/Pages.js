import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../auth/Login'
import Dashboard from './Dashboard'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Register from '../auth/Register'

function Pages() {
  return (
    <BrowserRouter>
      <ScreenWrap>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/two" element={<Two/>}/>
        <Route path="/three" element={<Three/>}/>
        <Route path="*" element={<NotFound/>}/> */}
        </Routes>
      </ScreenWrap>
    </BrowserRouter>
  )
}

export default Pages

const ContentWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* align-items: center; */
  background-color: #ffedeb;
`

export const ScreenWrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  background-color: #ffedeb;
`
