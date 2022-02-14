import React from 'react'
import Nav from './Nav'
import Pages from './Pages'
import { isAuthenticated } from '../../lib/auth'

function Layout() {
  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())

  return (
    <div className="screen-wrap">
      <Nav loggedIn={loggedIn}/>
      <div className="content-wrap">
        <Pages/>
      </div>
    </div>
  )
}

export default Layout