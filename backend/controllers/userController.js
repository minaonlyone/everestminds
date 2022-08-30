const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const userCourse = require('../models/userCourseModel')
const Course = require('../models/courseModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      roles: user.roles,
      isActive: user.isActive,
      points: user.points,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {

    if(!user.isActive){
      res.status(400)
      throw new Error('Account Inactive')
    }

    res.json({
      _id: user.id,
      name: user.name,
      roles: user.roles,
      isActive: user.isActive,
      points: user.points,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// @desc    Get user points
// @route   GET /api/users/myPoints
// @access  Private
const myPoints = asyncHandler(async (req, res) => {
  res.status(200).json(req.user.points)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @desc    Filter Courses By Category
// @route   GET /api/users/filterCourse
// @access  Private
const filterCourse = asyncHandler(async (req, res) => {
  // Check if course exists
  const course = await Course.find({"category":{ $in : req.body.category} })

  if (!course) {
    res.status(400)
    throw new Error('No Courses found')
  }

  res.status(200).json(course)

})

// @desc    Join Course
// @route   GET /api/users/joinCourse/:id
// @access  Private
const joinCourse = asyncHandler(async (req, res) => {
  const user = req.user.id;
  const course = req.params.id;
  // Check if course exists
  const courseExist = await Course.findById(course)

  if (!courseExist) {
    res.status(400)
    throw new Error('Course not found')
  }

  const joined = await userCourse.findOne({
    user,
    course
  })

  if(joined){
    res.status(400)
    throw new Error('Already joined.')
  }

  // Join the course
  const joinedCourse = await userCourse.create({
    user,
    course
  })

  if (joinedCourse) {
    res.status(200).json({msg: "Course joined successfully"})
  } else {
    res.status(400)
    throw new Error('Invalid course data')
  }

})

// @desc    Unjoin Course
// @route   GET /api/users/unJoinCourse/:id
// @access  Private
const unJoinCourse = asyncHandler(async (req, res) => {
  const user = req.user.id;
  const course = req.params.id;
  // Check if course joined
  const courseJoined = await userCourse.findOne({user,course})

  if (!courseJoined) {
    res.status(400)
    throw new Error('Course not joined')
  }

  // unJoin the course
  await userCourse.findOneAndUpdate({user,course},{status:"Unjoined"});

  res.status(200).json({msg: "Course unjoined successfully"})

})

// @desc    Unjoin Course
// @route   GET /api/users/finishCourse/:id
// @access  Private
const finishCourse = asyncHandler(async (req, res) => {
  const user = req.user.id;
  const course = req.params.id;
  // Check if course joined
  const courseJoined = await userCourse.findOne({user,course})

  if (!courseJoined) {
    res.status(400)
    throw new Error('Course not joined')
  }

  if(courseJoined.status == "Finished"){
    res.status(400)
    throw new Error('You already finished the course.')
  }

  // unJoin the course
  await userCourse.findOneAndUpdate({user,course},{status:"Finished"});
  const courseData = await Course.findById(course)
  const coursePoints = courseData.points;
  await User.updateOne({_id:user}, {$inc: {'points': coursePoints}})
  res.status(200).json({msg: "Course finished , "+coursePoints+" points have been added to your account."})

})

// @desc    Get User Courses
// @route   GET /api/users/myCourses
// @access  Private
const myCourses = asyncHandler(async (req, res) => {
  const user = req.user.id
  const courses = await userCourse.find({user}).populate("course")
  res.status(200).json(courses)
})


module.exports = {
  registerUser,
  loginUser,
  getMe,
  filterCourse,
  joinCourse,
  unJoinCourse,
  finishCourse,
  myCourses,
  myPoints
}
