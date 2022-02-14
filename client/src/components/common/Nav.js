import React from 'react'
import house from '../../images/house.png'

function Nav() {
  return (
    <div className="nav-bar">
      <div className='logo-wrap'>
        <img className="home-icon" src={house} alt="Logo" />
        <img className="home-icon" src={house} alt="Logo" />
        <img className="home-icon" src={house} alt="Logo" />
        <img className="home-icon" src={house} alt="Logo" />
        <img className="home-icon" src={house} alt="Logo" />
      </div>
    </div>
  )
}

export default Nav