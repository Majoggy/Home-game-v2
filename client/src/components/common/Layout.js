import React from 'react'
import Pages from './Pages'
// import { isAuthenticated } from '../../lib/auth'

function Layout() {
  // const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())

  return (
    <div className="screen-wrap">
      <Pages/>
    </div>
  )
}

export default Layout