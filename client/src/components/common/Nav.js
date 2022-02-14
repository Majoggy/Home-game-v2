import React from 'react'
import Home from '../../images/house.png'

function Nav({ loggedIn }) {
  return (
    <div className="nav-bar">
      {loggedIn &&
      <div className='logo-wrap'>
        <img className="home-icon" src={Home} alt="Home"/>
        <img className="home-icon" src={Home} alt="Home"/>
        <img className="home-icon" src={Home} alt="Home"/>
        <img className="home-icon" src={Home} alt="Home"/>
        <img className="home-icon" src={Home} alt="Home"/>
      </div>}
    </div>
  )
}

export default Nav