import axios from 'axios'

const API_ADMIN_URL = '/api/admin/'

// Get users
const listUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_ADMIN_URL + "users", config)

  return response.data
}

// Disable user
const disableUser = async (userId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_ADMIN_URL + "disableUser/" + userId,[], config)

  return response.data
}

// Add Admin User
const addAdminUser = async (userData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_ADMIN_URL + "addUser/" ,userData, config)

  return response.data
}

// Add Category
const addCategory = async (categoryData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_ADMIN_URL + "addCategory" ,categoryData, config)

  return response.data
}

// Update Category
const updateCategory = async (categoryId,categoryData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_ADMIN_URL + "updateCategory/" + categoryId ,categoryData, config)

  return response.data
}

// Delete Category
const deleteCategory = async (categoryId,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_ADMIN_URL + "deleteCategory/" + categoryId, config)
  
    return response.data
}


// Get Courses 
const listCourses = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_ADMIN_URL + "listCourses", config)
  
    return response.data

}

// Delete Category
const deleteCourse = async (courseId,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_ADMIN_URL + "deleteCourse/" + courseId, config)
  
    return response.data
}

// Add Course
const addCourse = async (courseData,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.put(API_ADMIN_URL + "addCourse" ,courseData, config)
  
    return response.data
}

// Get Course 
const listCourse = async (courseId,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_ADMIN_URL + "listCourse/" + courseId, config)
  
    return response.data

}

// Update Course
const updateCourse = async (courseData,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.put(API_ADMIN_URL + "updateCourse/" + courseData[0] ,courseData[1], config)
  
    return response.data
}

const adminService = {
  listUsers,
  disableUser,
  addAdminUser,
  addCategory,
  deleteCategory,
  updateCategory,
  listCourses,
  deleteCourse,
  addCourse,
  listCourse,
  updateCourse
}

export default adminService