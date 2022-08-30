const mongoose = require('mongoose')

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter course name.'],
    },
    description: {
      type: String,
      required: [true, 'Please enter course description'],
    },
    points: {
      type: Number,
      required: [true, 'Please enter course points'],
    },    
    category: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Course', courseSchema)
