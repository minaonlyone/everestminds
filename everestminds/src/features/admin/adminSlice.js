import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from './adminService'

const initialState = {
  users:[],
  categories:[],
  courses:[],
  currentCourseData:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  successMessage:'',
}



// Get users
export const listUsers = createAsyncThunk(
  'admin/listUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.listUsers(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Disable user 
export const disableUser = createAsyncThunk(
  'admin/disableUser',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.disableUser(userId,token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Add admin user 
export const addAdminUser = createAsyncThunk(
  'admin/addAdminUser',
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.addAdminUser(userData,token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// add category
export const addCategory = createAsyncThunk(
  'admin/addCategory',
  async (categoryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.addCategory(categoryData,token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete category 
export const deleteCategory = createAsyncThunk(
    'admin/deleteCategory',
    async (categoryId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.deleteCategory(categoryId,token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Update category 
export const updateCategory = createAsyncThunk(
    'admin/updateCategory',
    async (categoryData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.updateCategory(categoryData[0],categoryData[1],token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Get Courses
export const listCourses = createAsyncThunk(
    'admin/listCourses',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.listCourses(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Read Course
export const listCourse = createAsyncThunk(
    'admin/listCourse',
    async (courseId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        console.log(courseId)
        return await adminService.listCourse(courseId,token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Delete Course 
export const deleteCourse = createAsyncThunk(
    'admin/deleteCourse',
    async (courseId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.deleteCourse(courseId,token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// add course
export const addCourse = createAsyncThunk(
    'admin/addCourse',
    async (courseData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.addCourse(courseData,token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Update course 
export const updateCourse = createAsyncThunk(
    'admin/updateCourse',
    async (courseData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.updateCourse(courseData,token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder      
      .addCase(listUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })     
      .addCase(disableUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(disableUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = action.payload.msg
      })
      .addCase(disableUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addAdminUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAdminUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = action.payload.msg
      })
      .addCase(addAdminUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = action.payload.msg
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })              
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = action.payload.msg
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = action.payload.msg
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })      
      .addCase(listCourses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(listCourses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.courses = action.payload
      })
      .addCase(listCourses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })            
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = action.payload.msg
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })   
      .addCase(addCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = action.payload.msg
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })   
      .addCase(listCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(listCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentCourseData = action.payload
      })
      .addCase(listCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })    
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = action.payload.msg
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })                       

  },
})

export const { reset } = adminSlice.actions
export default adminSlice.reducer