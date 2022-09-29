// const express =require('express') //import express framework
// const dotenv= require('dotenv')
// const products =require('./data/products')

import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js' // you have to put the extension .js

dotenv.config()

connectDB() //connect our server with mongoDB

const app = express() //put all method inside a variable

// example on middleware:
// app.use((req,res,next)=>{
// 	console.log('Hello from the middle of request')
// next()
// })
// each time you make a request the middleware function will excecute and next() mean continue with request

// http://localhost:5000/
app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)

//error middleware
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

// 200 status => it's Ok
// 401 status => not authorized
// 404 status => page not found
// 500 status => server error
