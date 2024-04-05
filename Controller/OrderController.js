const Order = require('../model/Order')


const createOrder = async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json({ message: savedOrder })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }
        )
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id,)
        res.status(200).json({
            message: 'Order Has been Deleted....'
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const getuserOrder = async (req, res) => {
    try {
        const getOrder = await Order.find({ userId: req.params.userId })
        res.status(200).json({
            message: getOrder
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const getallOrder = async (req, res) => {
    try {
        const AllOrder = await Order.find();
        res.status(200).json({
            message: AllOrder
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const monthlyincome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ]);
        res.status(200).json({
            message: income
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getuserOrder,
    getallOrder,
    monthlyincome
}