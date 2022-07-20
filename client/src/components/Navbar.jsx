import styled from 'styled-components'
import React from 'react'
import { isAuthenticated } from '../lib/auth'
import { useLocation } from 'react-router-dom'

const menuItems = [
  { name: 'Dashboard', link: 'dashboard' },
  { name: 'Add Player', link: 'addPlayer' },
  { name: 'Add Game', link: 'addGame' },
  { name: 'Log Out', link: 'logOut' },
]

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())

  useLocation()
  return (
    <>
      <NavWrapper>
        <MenuWrapper>
          {loggedIn &&
            menuItems.map((item) => (
              <MenuItem key={item.name} name={item.name} link={item.link} />
            ))}
        </MenuWrapper>
      </NavWrapper>
    </>
  )
}

export const MenuItem = ({ name, link }) => (
  <MenuItemTitle>{name}</MenuItemTitle>
)

const NavWrapper = styled.div`
  width: 160px;
  height: 100vh;
  display: flex;
  background-color: #dd746c;
  /* border-right: 2px solid black; */
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

const MenuItemTitle = styled.div`
  margin: 8px;
  padding: 10px;
  background-color: white;
  width: 85%;
  text-align: center;
  border-radius: 3px;
  /* border: 2px solid black; */
  @media only screen and (min-width: 2000px) {
    /* margin: 16px; */
    padding: 12px;
  }
`

export default Navbar
