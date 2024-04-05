const product = require('../model/Product')


const createproduct = async (req, res) => {
    const newproduct = new product(req.body)
    try {
        const savedproduct = await newproduct.save()
        res.status(200).json({ message: savedproduct })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const updateproduct = async (req, res) => {
    try {
        const updatedproduct = await product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }
        )
        res.status(200).json(updatedproduct)
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const deleteproduct = async (req, res) => {
    try {
        await product.findByIdAndDelete(req.params.id,)
        res.status(200).json({
            message: 'Product Has been Deleted....'
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const getproduct = async (req, res) => {
    try {
        const getproduct = await product.findById(req.params.id)
        res.status(200).json({
            message: getproduct
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const getallproduct = async (req, res) => {
    const qnew = req.query.new
    const qcategory = req.query.category
    try {
        let products;

        if (qnew) {
            products = await product.find().sort({ craetedAt: -1 }).limit(5)
        } else if (qcategory) {
            products = await product.find({
                categories: {
                    $in: [qcategory],
                },
            });
        } else {
            products = await product.find()
        }
        res.status(200).json({
            message: { products }
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

module.exports = {
    createproduct,
    updateproduct,
    deleteproduct,
    getproduct,
    getallproduct
}