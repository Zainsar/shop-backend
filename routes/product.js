const router = require('express').Router()
const { verifytoken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifytoken')
const Product = require('../Controller/ProductController')

router.post('/', verifyTokenAndAdmin, Product.createproduct)
router.put('/:id', verifyTokenAndAdmin, Product.updateproduct)
router.delete('/:id', verifyTokenAndAdmin, Product.deleteproduct)
router.get('/find/:id', Product.getproduct)
router.get('/', Product.getallproduct)

module.exports = router