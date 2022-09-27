import mongoose from 'mongoose'

// we put (async) because when we deal with MongoDB, when we call .connect or .find or .create and so on, it's always going to return a promise
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline) // .cyan.underline to add colors to the console
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1) // 1 it means it's going to exsit with failure
  }
}

export default connectDB
