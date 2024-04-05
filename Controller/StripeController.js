const stripe = require('stripe')(process.env.STRIPE_KEY)

const payment = async (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        Currency: "usd"
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json({
                message: stripeErr
            })
        } else {
            res.status(200).json({
                message: stripeRes
            })
        }
    })
}

module.exports = {
    payment
}