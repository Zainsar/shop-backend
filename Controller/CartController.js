const Cart = require('../model/Cart')


const createCart = async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json({ message: savedCart })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }
        )
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id,)
        res.status(200).json({
            message: 'Cart Has been Deleted....'
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const getuserCart = async (req, res) => {
    try {
        const getCart = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json({
            message: getCart
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const getallCart = async (req, res) => {
    try {
        const AllCart = await Cart.find();
        res.status(200).json({
            message: AllCart
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getuserCart,
    getallCart
}