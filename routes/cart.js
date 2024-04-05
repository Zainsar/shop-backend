const router = require('express').Router()
const { verifytoken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifytoken')
const Cart = require('../Controller/CartController')

router.post('/', verifytoken, Cart.createCart)
router.put('/:id', verifyTokenAndAuthorization, Cart.updateCart)
router.delete('/:id', verifyTokenAndAuthorization, Cart.deleteCart)
router.get('/find/:userId', verifyTokenAndAuthorization, Cart.getuserCart)
router.get('/', verifyTokenAndAdmin, Cart.getallCart)

module.exports = router