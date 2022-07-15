import React from 'react'
import styled from 'styled-components'
// import Pages from './Pages'
import { Navbar } from '../components/Navbar'
import Pages from './Pages'
// import { isAuthenticated } from '../../lib/auth'

function Layout() {
  // const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())
  return (
    <>
      <ScreenWrap>
        <Navbar />
        <ContentWrap>
          <Pages />
        </ContentWrap>
      </ScreenWrap>
    </>
  )
}

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
  display: flex;
  background-color: #ffedeb;
`

export default Layout
