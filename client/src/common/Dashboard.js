import React from 'react'
import styled from 'styled-components'
import { ContentWrap } from '../components/ContentWrap.style'
import { isAuthenticated, getPayLoad } from '../lib/auth'
import { useNavigate } from 'react-router-dom'
import { profileUser } from '../lib/api'

function Dashboard() {
  const [userId, setUserId] = React.useState(null)
  const [userInfo, setUserInfo] = React.useState(null)

  // const navigate = useNavigate()
  // const isAuth = isAuthenticated()

  // This code works, but I'd rather use secure route
  // React.useEffect(() => {
  //   const redirect = () => {
  //     if (!isAuth) navigate('/')
  //   }
  //   redirect()
  // })

  const getUser = async () => {
    const payLoad = await getPayLoad()
    setUserId(payLoad.sub)
  }

  const getData = async () => {
    try {
      await getUser()
      console.log(await getUser())
      const response = await profileUser(userId)
      console.log(response.data)
      console.log(userId)
      const data = response.data
      setUserInfo(data)
    } catch (err) {
      console.log('Something has gone wrong!')
    }
  }
  React.useEffect(() => {
    getData()
  }, [])

  return (
    <ContentWrap>
      <Spacer />
      <DesktopGrid>
        <Div1>
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
              {userInfo &&
                userInfo.statistics.map((player) => (
                  <tr key={player.name}>
                    <td>{player.name}</td>
                    <td>
                      {player.gamesPlayed === 0 ? '-' : player.gamesPlayed}
                    </td>
                    <td>{player.topTwoPercentage}</td>
                    <td>{player.winnings ? `£${player.winnings}` : '-'}</td>
                    <td>{player.losses ? `£${player.losses}` : '-'}</td>
                    <td>{player.total}</td>
                    <td>{player.average}</td>
                  </tr>
                ))}
            </table>
          </div>
        </Div1>
        <Div2></Div2>
        <Div3></Div3>
      </DesktopGrid>
      <Spacer />
    </ContentWrap>
  )
}

export const DesktopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  min-height: 600px;
  margin: 20px;
  max-height: 820px;
  max-width: 1200px;
  @media only screen and (max-width: 1445px) {
    width: 800px;
  }
`

export const Spacer = styled.div`
  margin: 17px;
`

export const Div1 = styled.div`
  border-radius: 0.5rem;
  background-color: white;
  grid-area: 1 / 1 / 4 / 3;
`

export const Div2 = styled.div`
  border-radius: 0.5rem;
  background-color: white;
  grid-area: 4 / 1 / 6 / 2;
`

export const Div3 = styled.div`
  border-radius: 0.5rem;
  background-color: white;
  grid-area: 4 / 2 / 6 / 3;
`

export default Dashboard
