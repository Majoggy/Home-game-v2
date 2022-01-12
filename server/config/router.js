import express from 'express'
import players from '../controllers/players.js'
import auth from '../controllers/auth.js'

const router = express.Router()

router.route('/players')
  .get(players.index)
  .post(players.create)

router.route('/players/:playerId')
  .get(players.show)
  .put(players.update)
  .delete(players.delete)

router.get('/players/user/:userId', players.indexByUser)
router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/users', auth.index)

export default router