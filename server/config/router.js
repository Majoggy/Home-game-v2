import express from 'express'
import players from '../controllers/players.js'

const router = express.Router()

router.route('/players')
  .get(players.index)
  .post(players.create)

router.route('/players/:playerId')
  .get(players.show)
  .put(players.update)
  .delete(players.delete)

export default router