import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users) // import users to database

    const adminUser = createdUsers[0]._id // get admin user id

    const sampleProducts = products.map((product) => { //add admin user id for all products
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts) // import products to database

    console.log('Data Imported!'.green.inverse);
    process.exit()

  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}


const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse);
    process.exit()

  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}


/* 
if you want import data or destroy data you have to write one of these commands:
1- import data: node seeder
2- destroy data: node seeder -d
so, the process.argv[2] it differs from import and destroy and it will be -d if you destroy data
*/
if (process.argv[2]=== '-d') {
    destroyData()
} else {
    importData()
}

/* 
we can add scripts in the package.json to run import and destroy data as this:
"scripts": {
    "start": "node server",
    "server": "nodemon server",
    "client": "npm start --prefix ../proshop-front-end",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "data:import": "node seeder",
    "data:destroy": "node seeder -d"
  },
  so if you want to import data, write this command: npm run data:import
  so if you want to destroy data, write this command: npm run data:destroy
  if you want to run server and front end in the same command write: npm run dev
*/