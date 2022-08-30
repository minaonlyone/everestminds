const mongoose = require('mongoose')

const userCourseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },      
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    status: {
      type: String,
      default: "Joined"
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('userCourse', userCourseSchema)
