import React from 'react'
import styled from 'styled-components'

function StatsTable({ userInfo }) {
  return (
    <ContentWrap>
      <Table>
        <tbody>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Games Played</TableHead>
            <TableHead>Top Two Percentage</TableHead>
            <TableHead>Total Won</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Profit/loss</TableHead>
            <TableHead>Per game</TableHead>
          </TableRow>
          {userInfo &&
            userInfo.statistics.map((player, index) => (
              <TableRow key={`${player.name} ${index}`}>
                <TableData>{player.name}</TableData>
                <TableData>
                  {player.gamesPlayed === 0 ? '-' : player.gamesPlayed}
                </TableData>
                <TableData>{player.topTwoPercentage}</TableData>
                <TableData>
                  {player.winnings ? `£${player.winnings}` : '-'}
                </TableData>
                <TableData>
                  {player.losses ? `£${player.losses}` : '-'}
                </TableData>
                <TableData>{player.total}</TableData>
                <TableData>{player.average}</TableData>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </ContentWrap>
  )
}

export default StatsTable

const ContentWrap = styled.div``

const Table = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
`
const TableHead = styled.th`
  background-color: #dd746c;
  padding: 12px;

  :first-of-type {
    border-top-left-radius: 0.4rem;
    padding-left: 20px;
  }
  :last-of-type {
    border-top-right-radius: 0.4rem;
  }
`

const TableRow = styled.tr``

const TableData = styled.td`
  padding-top: 10px;
  :first-of-type {
    padding-left: 20px;
  }
  :last-of-type {
    padding-right: 15px;
  }
`
