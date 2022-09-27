import express from 'express'
import asyncHandler from 'express-async-handler' //Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const router = express.Router()
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @acsess  Public
// http://localhost:5000/api/products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @acsess  Public
// http://localhost:5000/api/products/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404) // default status error is 500 but we costumized it to be 404
      throw new Error('Product not found')
    }
  })
)

export default router

//because the products are a JS array of objs, it's not actual json contents, the res.send() or res.json(), it is going to convert it to the json content type
