import React from 'react'
import { profileUser } from '../../lib/api'
import { getPayLoad } from '../../lib/auth'
import { statify } from '../../lib/helpers'

function Dashboard() {
    const [userId, setUserId] = React.useState(null)

  const getUser = async () => {
    const payLoad = getPayLoad()
    setUserId(payLoad.sub)
  }

  React.useEffect(() => {
    const getData = async () => {
      try { 
        await getUser()
        const response = await profileUser(userId)
        const userData = response.data
        console.log(userData)
        console.log(statify(userData))
      } catch (err) {
        console.log('Something has gone wrong!')
      }
    }
    getData()
  })
  
  return <h1>Dashboard</h1>
}

export default Dashboard