import React from 'react'
import Nav from './Nav'
import Pages from './Pages'

function Layout() {
  return (
    <div className="dash-wrap">
      <Nav/>
      <div className="content-wrap">
        <Pages/>
      </div>
    </div>
  )
}

export default Layout