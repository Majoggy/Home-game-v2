import React from 'react'
import { profileUser } from '../../lib/api'
import { getPayLoad } from '../../lib/auth'
import { statify } from '../../lib/helpers'

function Dashboard() {
  const [userId, setUserId] = React.useState(null)
  // const [userData, setUserData] = React.useState(null)
  const [stats, setStats] = React.useState(null)

  const getUser = async () => {
    const payLoad = getPayLoad()
    setUserId(payLoad.sub)
    console.log(userId)
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        await getUser()
        const response = await profileUser(userId)
        const data = response.data
        setStats(statify(data))
        console.log('stats =>', stats)
      } catch (err) {
        console.log('Something has gone wrong!')
      }
    }
    getData()
  }, [])

  return (
    <div className="content-wrap">
      <div className="game-list"></div>
      <table>
        <tr>
          <th>Name</th>
          <th>Games Played</th>
          <th>Top Two Percentage</th>
          <th>Total Won</th>
          <th>Total Spent</th>
          <th>Profit/loss</th>
          <th>Per game</th>
        </tr>
        {stats &&
          stats.map((player) => (
            <tr key={player.name}>
              <td>{player.name}</td>
              <td>{player.gamesPlayed === 0 ? '-' : player.gamesPlayed}</td>
              <td>{player.topTwoPercentage}</td>
              <td>{player.winnings ? `£${player.winnings}` : '-'}</td>
              <td>{player.losses ? `£${player.losses}` : '-'}</td>
              <td>{player.total}</td>
              <td>{player.average}</td>
            </tr>
          ))}
      </table>
    </div>
  )
}

export default Dashboard
