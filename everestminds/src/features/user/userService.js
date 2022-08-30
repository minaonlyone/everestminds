import axios from 'axios'

const API_URL = '/api/users/'
const API_ADMIN_URL = '/api/admin/'

// Get courses categories
const getAllCategories = async (token) => {
    
    const response = await axios.get(API_ADMIN_URL + "listCategory")
  
    return response.data
}

// Get courses
const loadCourses = async (category) => {
    
    const response = await axios.post(API_URL + "filterCourse",category)
  
    return [response.data,category.category]
}

// join new course
const joinCourse = async (courseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + "joinCourse/" + courseData ,[], config)

  return response.data
}

// Get user courses
const getMyCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + "myCourses", config)

  return response.data
}

// Get user points
const getMyPoints = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + "myPoints", config)

  return response.data
}

// unjoin from course
const unJoinCourse = async (courseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + "unJoinCourse/" + courseId,[], config)

  return response.data
}

// unjoin from course
const finishCourse = async (courseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + "finishCourse/" + courseId,[], config)

  return response.data
}

const userService = {
  joinCourse,
  getMyCourses,
  unJoinCourse,
  getAllCategories,
  loadCourses,
  finishCourse,
  getMyPoints
}

export default userService