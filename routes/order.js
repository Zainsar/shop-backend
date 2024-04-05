const router = require('express').Router()
const { verifytoken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifytoken')
const Order = require('../Controller/OrderController')

router.post('/', verifytoken, Order.createOrder)
router.put('/:id', verifyTokenAndAdmin, Order.updateOrder)
router.delete('/:id', verifyTokenAndAdmin, Order.deleteOrder)
router.get('/find/:userId', verifyTokenAndAuthorization, Order.getuserOrder)
router.get('/', verifyTokenAndAdmin, Order.getallOrder)
router.get('/income', verifyTokenAndAdmin, Order.monthlyincome)

module.exports = router