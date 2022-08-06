import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from '../auth/Login'
// import Dashboard from './Dashboard'
// import styled from 'styled-components'
// import Navbar from '../components/Navbar'
// import Register from '../auth/Register'

function StatsTable({ userInfo }) {
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
        {userInfo &&
          userInfo.statistics.map((player) => (
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

export default StatsTable
