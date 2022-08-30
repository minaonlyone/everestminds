const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const Course = require('../models/courseModel')

// @desc    Add Admin User
// @route   PUT /api/admin/addUser
// @access  Private
const addUser = asyncHandler(async (req, res) => {
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
        roles:["User","Admin"]
    })

    if (user) {
        res.status(200).json({msg: "User created successfully"})
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Disable user acount
// @route   PUT /api/admin/disableUser/:id
// @access  Private
const disableUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  await user.update({"isActive":false})

  res.status(200).json({ msg: "Account disabled." })
})

// @desc    List all Users
// @route   GET /api/admin/users
// @access  Private
const listUsers = asyncHandler(async (req, res) => {
    // Check if category exists
    const user = await User.find({})

    if (!user) {
      res.status(400)
      throw new Error('No Users found')
    }

    res.status(200).json(user)

})

// Course Categories CRUD

// @desc    Add Course Category
// @route   PUT /api/admin/addCategory
// @access  Private
const addCategory = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400)
        throw new Error('Please enter category name')
    }

    // Check if category exists
    const categoryExists = await Category.findOne({ name })

    if (categoryExists) {
        res.status(400)
        throw new Error('Category already exists')
    }

    // Create category
    const createdCategory = await Category.create({
        name,
    })

    if (createdCategory) {
        res.status(200).json({msg: "Category created successfully"})
    } else {
        res.status(400)
        throw new Error('Invalid category data')
    }
})

// @desc    Update Category name
// @route   PUT /api/admin/updateCategory/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body  

    if (!name) {
        res.status(400)
        throw new Error('Please enter new category name')
    }

    const category = await Category.findById(req.params.id)

    if (!category) {
      res.status(400)
      throw new Error('Category not found')
    }

    await category.update({name})
  
    res.status(200).json({ msg: "Category Updated." })
})

// @desc    Delete Course Category
// @route   DELETE /api/admin/deleteCategory/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
    // Check if category exists
    const category = await Category.findById(req.params.id)

    if (!category) {
      res.status(400)
      throw new Error('Category not found')
    }

    await category.remove()

    res.status(200).json({msg: "Category deleted successfully"})

})

// @desc    List all Categories
// @route   GET /api/admin/listCategory
// @access  Private
const listCategory = asyncHandler(async (req, res) => {
    // Check if category exists
    const category = await Category.find({})

    if (!category) {
      res.status(400)
      throw new Error('No Categories found')
    }

    res.status(200).json(category)

})

// Courses CRUD

// @desc    Add Course
// @route   PUT /api/admin/addCourse
// @access  Private
const addCourse = asyncHandler(async (req, res) => {
    const { name , description , category , points } = req.body

    if (!name || !description || !category || !points) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    // Create course
    const createdCourse = await Course.create({
        name,
        description,
        category,
        points
    })

    if (createdCourse) {
        res.status(200).json({msg: "Course created successfully"})
    } else {
        res.status(400)
        throw new Error('Invalid course data')
    }
})

// @desc    Update Course
// @route   PUT /api/admin/updateCourse/:id
// @access  Private
const updateCourse = asyncHandler(async (req, res) => {
    const { name, description, points, category} = req.body    
  
    const course = await Course.findById(req.params.id)

    if (!course) {
      res.status(400)
      throw new Error('Course not found')
    }
  
    await course.update({name, description, points, category})
  
    res.status(200).json({ msg: "Course Updated." })
})

// @desc    Delete Course Category
// @route   DELETE /api/admin/deleteCourse/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, res) => {
    // Check if course exists
    const course = await Course.findById(req.params.id)

    if (!course) {
      res.status(400)
      throw new Error('Course not found')
    }

    await course.remove()

    res.status(200).json({msg: "Course deleted successfully"})

})

// @desc    List all Courses
// @route   GET /api/admin/listCourses
// @access  Private
const listCourses = asyncHandler(async (req, res) => {
    // Check if category exists
    const course = await Course.find({}).populate('category')

    if (!course) {
      res.status(400)
      throw new Error('No Courses found')
    }

    res.status(200).json(course)

})

// @desc    Read Specific Course
// @route   GET /api/admin/listCourse/:id
// @access  Private
const listCourse = asyncHandler(async (req, res) => {
    // Check if course exists
    const course = await Course.findById(req.params.id)

    if (!course) {
      res.status(400)
      throw new Error('Course not found')
    }

    res.status(200).json(course)

})

module.exports = {
  addUser,
  disableUser,
  listUsers,
  addCategory,
  updateCategory,
  deleteCategory,
  listCategory,
  addCourse,
  updateCourse,
  deleteCourse,
  listCourse,
  listCourses,
}
