const router = require('express').Router()
const { verifytoken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifytoken')
const User = require('../Controller/UserController')

router.put('/:id', verifyTokenAndAuthorization, User.update)
router.delete('/:id', verifyTokenAndAuthorization, User.deletes)
router.get('/find/:id', verifyTokenAndAdmin, User.getuser)
router.get('/', verifyTokenAndAdmin, User.getalluser)
router.get('/stats', verifyTokenAndAdmin, User.getuserstats)

module.exports = router