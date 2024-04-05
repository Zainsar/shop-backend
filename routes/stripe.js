const router = require('express').Router()
const Stripe = require('../Controller/StripeController')

router.post('/payment', Stripe.payment)

module.exports = router