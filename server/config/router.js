import express from 'express'
import players from '../controllers/players.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/players')
  .get(secureRoute, players.index)
  .post(secureRoute, players.create)

router.route('/players/:playerId')
  .get(secureRoute, players.show)
  .put(secureRoute, players.update)
  .delete(secureRoute, players.delete)

router.get('/players/user/:userId', secureRoute, players.indexByUser)
router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/users', secureRoute, auth.index)

export default router