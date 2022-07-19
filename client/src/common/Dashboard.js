import React from 'react'
import styled from 'styled-components'
import { ContentWrap } from '../components/ContentWrap.style'
// import { isAuthenticated } from '../../lib/auth'

function Dashboard() {
  // const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())
  return (
    <ContentWrap>
      <Spacer />
      <DesktopGrid>
        <Div1></Div1>
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
  /* border: 2px solid black; */
  border-radius: 0.5rem;
  background-color: white;
  grid-area: 1 / 1 / 4 / 3;
`

export const Div2 = styled.div`
  /* border: 2px solid black; */
  border-radius: 0.5rem;
  background-color: white;
  grid-area: 4 / 1 / 6 / 2;
`

export const Div3 = styled.div`
  /* border: 2px solid black; */
  border-radius: 0.5rem;
  background-color: white;
  grid-area: 4 / 2 / 6 / 3;
`

export default Dashboard
