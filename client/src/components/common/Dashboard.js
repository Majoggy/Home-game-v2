import React from 'react'
import { profileUser } from '../../lib/api'
import { getPayLoad } from '../../lib/auth'
import { statify } from '../../lib/helpers'

function Dashboard() {
  const [userId, setUserId] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const payLoad = getPayLoad()
        const user = payLoad.sub
        setUserId(user)
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

  return (
    <h1>Dashboard tho</h1>
  )
}

export default Dashboard