const express = require('express')
const router = express.Router()
const {
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
  listCourses
} = require('../controllers/adminController')

const { protectAdmin } = require('../middleware/adminMiddleware')


// Users Routes
router.route('/addUser').put(protectAdmin,addUser)
router.route('/disableUser/:id').put(protectAdmin,disableUser)
router.route('/users').get(protectAdmin,listUsers)

//Cateogry Routes
router.route('/addCategory').put(protectAdmin,addCategory)
router.route('/updateCategory/:id').put(protectAdmin,updateCategory)
router.route('/deleteCategory/:id').delete(protectAdmin, deleteCategory)
router.route('/listCategory').get(listCategory)

//Course Routes
router.route('/addCourse').put(protectAdmin,addCourse)
router.route('/updateCourse/:id').put(protectAdmin,updateCourse)
router.route('/deleteCourse/:id').delete(protectAdmin, deleteCourse)
router.route('/listCourses').get(listCourses)
router.route('/listCourse/:id').get(listCourse)


module.exports = router
