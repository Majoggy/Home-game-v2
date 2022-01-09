import Player from '../models/player.js'
import { connectToDb, truncateDb, disconnectDb } from './helpers.js'
import playerData from './data/player.js'

async function seed() {
  try {
    await connectToDb()
    console.log('Database connected!')

    await truncateDb()
    console.log('Database dropped!')

    const players = await Player.create(playerData)

    console.log(`${players.length} players added to the database!`)
  } catch (err) {
    console.log('Something went wrong!')
    console.log(err)
  }
  await disconnectDb()
  console.log('Disconnected from Db!')
}

seed()