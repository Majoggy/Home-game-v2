import React from 'react'
import styled from 'styled-components'

function GamesList({ userInfo }) {
  return (
    <ContentWrap>
      {userInfo &&
        userInfo.addedGames.map((game, index) => <Button>Hello World</Button>)}
    </ContentWrap>
  )
}

export default GamesList

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 3px;
`

const Button = styled.table`
  width: -moz-calc(100% - 13px);
  width: -webkit-calc(100% - 13px);
  width: -o-calc(100% - 13px);
  width: calc(100% - 13px);
  background-color: #dd746c;
  height: 40px;
  padding: 5px;
  margin: 7px;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
  border-radius: 0.3rem;
  overflow: none;
`
