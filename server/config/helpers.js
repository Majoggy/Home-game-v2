import _ from 'lodash'

export default function statify(data) {
  const newData = []
  const paidPlaces = ['firstPlace', 'secondPlace', 'thirdPlace']
  let statObj = {
    placings: [],
    winnings: [],
    buyIns: [],
  }
  // console.log(data.addedGames)
  data.addedPlayers.forEach((player) => {
    const name = player.name
    let playerObj = { name: name }
    data.addedGames.forEach((game) => {
      Object.entries(game).forEach((field) => {
        const [key, value] = field
        if (value.name === name) {
          if (paidPlaces.includes(key)) {
            statObj.placings.push(key)
            if (key === paidPlaces[0]) {
              statObj.winnings.push(game.firstPrize)
            } else if (key === paidPlaces[1]) {
              statObj.winnings.push(game.secondPrize)
            } else statObj.winnings.push(game.thirdPrize)
          } else statObj.placings.push(key)
          statObj.buyIns.push(game.buyIn)
        }
      })
      playerObj = { ...playerObj, ...statObj }
    })
    statObj = { placings: [], buyIns: [], winnings: [] }
    newData.push(populatePlayerObj(playerObj, paidPlaces))
  })
  return newData
}

function populatePlayerObj(player, places) {
  player.winnings = _.sum(player.winnings)
  player.buyIns = _.sum(player.buyIns)
  player.total = player.winnings - player.buyIns
  player.gamesPlayed = player.placings.length
  player.topTwoPercentage = percentage(
    topTwoCount(player.placings, places),
    player.gamesPlayed
  )
  player.average = minusFormatting(
    (player.total / player.gamesPlayed).toFixed(1)
  )

  if (player.gamesPlayed === 0) {
    player = { ...player, average: '-', topTwoPercentage: '-', total: '-' }
  }

  delete player.placings
  return player
}

function topTwoCount(placings, paidPlaces) {
  let count = 0
  placings.forEach((placing) => {
    if (placing === paidPlaces[0] || placing === paidPlaces[1]) {
      count++
    }
  })
  return count
}

export function percentage(part, whole) {
  const result = (100 * part) / whole
  return `${result.toFixed(0)}%`
}

export function minusFormatting(num) {
  if (num < 0) {
    num = num * -1
    return `-£${num}`
  } else if (num === 0) {
    return '£0'
  } else return `£${num}`
}
