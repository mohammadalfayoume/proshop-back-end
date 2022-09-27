// const express =require('express') //import express framework
// const dotenv= require('dotenv')
// const products =require('./data/products')

import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import products from './data/products.js' // you have to put the extension .js

dotenv.config()

connectDB() //connect our server with mongoDB

const app = express() //put all method inside a variable

app.get('/', testHandler)
app.get('/api/products', getProductsHandler)
app.get('/api/products/:id', getProductHandler)

// http://localhost:5000/
function testHandler(req, res) {
  res.send('API is running...')
}
// http://localhost:5000/api/products
function getProductsHandler(req, res) {
  res.json(products) //because the products are a JS array of objs, it's not actual json contents, the res.send() or res.json(), it is going to convert it to the json content type
}
// http://localhost:5000/api/products/:id
function getProductHandler(req, res) {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
