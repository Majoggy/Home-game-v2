import styled from 'styled-components'
import React from 'react'
import { isAuthenticated, removeToken } from '../lib/auth'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = () => {
  const isAuth = isAuthenticated()
  useLocation()

  const handleLogout = () => {
    removeToken()
  }

  return (
    <NavWrapper>
      <MenuWrapper>
        {isAuth && (
          <>
            <MenuItem to="/dashboard">Dashboard</MenuItem>
            <MenuItem to="/addPlayer">Add Player</MenuItem>
            <MenuItem to="/addGame">Add Game</MenuItem>
            <MenuItem to="/" onClick={handleLogout}>
              Log Out
            </MenuItem>
          </>
        )}
      </MenuWrapper>
    </NavWrapper>
  )
}

const NavWrapper = styled.div`
  width: 160px;
  min-height: 100vh;
  display: flex;
  background-color: #dd746c;

  @media only screen and (min-width: 2000px) {
    width: 250px;
  }
`
const MenuWrapper = styled.div`
  width: 100vh;
  display: flex;
  margin: 20px;
  margin-bottom: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MenuItem = styled(Link)`
  margin: 8px;
  padding: 10px;
  background-color: white;
  color: black;
  width: 85%;
  text-align: center;
  border-radius: 3px;
  text-decoration: none;

  @media only screen and (min-width: 2000px) {
    /* margin: 16px; */
    padding: 12px;
  }
`

export default Navbar
