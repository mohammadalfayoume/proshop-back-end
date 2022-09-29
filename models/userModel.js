import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

/*
Mongoose schemas support a timestamps option. If you set timestamps: true, Mongoose will add two properties of type Date to your schema:

createdAt: a date representing when this document was created
updatedAt: a date representing when this document was last updated
Mongoose will then set createdAt when the document is first inserted, and update updatedAt whenever you update the document using save(), updateOne(), updateMany(), findOneAndUpdate(), update(), replaceOne(), or bulkWrite().
*/

const User = mongoose.model('User', userSchema)

export default User
