import _ from 'lodash'

export function statify (data) {
  const newData = []
  const paidPlaces = ['firstPlace', 'secondPlace', 'thirdPlace']
  let statObj = {
    'placings': [],
    'winnings': [],
    'buyIns': [],
  }

  data.addedPlayers.forEach(player => {
    const name = player.name
    let playerObj = { 'name': name }
    data.addedGames.forEach(game => {

      Object.entries(game).forEach(field => {
        const [ key, value ] = field
        if (value === name) {
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

    playerObj.winnings = _.sum(playerObj.winnings)
    playerObj.buyIns = _.sum(playerObj.buyIns)
    playerObj.total = playerObj.winnings - playerObj.buyIns
    playerObj.gamesPlayed = playerObj.placings.length
    playerObj.topTwoPercentage = percentage(topTwoCount(playerObj.placings, paidPlaces), playerObj.gamesPlayed)    
    playerObj.average = minusFormatting((playerObj.total / playerObj.gamesPlayed).toFixed(1))

    if (playerObj.gamesPlayed === 0) playerObj = { ...playerObj, average: '-', topTwoPercentage: '-', 'total': '-' } 
    delete playerObj.placings
    newData.push(playerObj)
  })
  return newData
}

function topTwoCount (placings, paidPlaces) {
  let count = 0
  placings.forEach(placing => {
    if (placing === paidPlaces[0] || placing === paidPlaces[1]) {
      count ++
    }
  }) 
  return count
}

export function percentage (part, whole) {
  const result = 100 * part / whole
  return `${result.toFixed(0)}%`
}

export function minusFormatting (num) {
  if (num < 0) {
    num = num * -1
    return `-£${num}`
  } else if (num === 0) {
    return '£0' 
  } else return `£${num}`
}