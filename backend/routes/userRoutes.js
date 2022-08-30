const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  filterCourse,
  joinCourse,
  unJoinCourse,
  finishCourse,
  myCourses,
  myPoints
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

// Public Access
router.post('/', registerUser)
router.post('/login', loginUser)

router.post("/filterCourse",filterCourse)

//Logged User
router.get('/me', protect, getMe)
router.get('/myPoints', protect, myPoints)
router.get('/myCourses',protect, myCourses)
router.put('/joinCourse/:id', protect, joinCourse)
router.put('/unJoinCourse/:id', protect, unJoinCourse)
router.put('/finishCourse/:id', protect, finishCourse)


module.exports = router
