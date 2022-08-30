import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  myCourses: [],
  courses: [],
  myPoints: 0,
  currentCategory: [],
  coursesCategories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  successMessage:'',
}

// Join new Course
export const joinCourse = createAsyncThunk(
  'courses/join',
  async (courseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.joinCourse(courseData, token)
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

// Get user courses
export const getMyCourses = createAsyncThunk(
  'users/myCourses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.getMyCourses(token)
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

// Get user courses
export const getMyPoints = createAsyncThunk(
  'users/myPoints',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.getMyPoints(token)
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

// Get courses categories
export const getAllCategories = createAsyncThunk(
  'users/getAllCategories',
  async (_, thunkAPI) => {
    try {
      return await userService.getAllCategories()
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

// Get courses 
export const loadCourses = createAsyncThunk(
  'users/loadCourses',
  async (category, thunkAPI) => {
    try {
      return await userService.loadCourses({"category":[category]})
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

// unjoin from course
export const unJoinCourse = createAsyncThunk(
  'courses/unJoin',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.unJoinCourse(id, token)
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

// finish course
export const finishCourse = createAsyncThunk(
  'courses/finish',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.finishCourse(id, token)
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(joinCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = action.payload.msg
      })
      .addCase(joinCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMyCourses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyCourses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.myCourses = action.payload
      })
      .addCase(getMyCourses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMyPoints.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyPoints.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.myPoints = action.payload
      })
      .addCase(getMyPoints.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(unJoinCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(unJoinCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = action.payload.msg
      })
      .addCase(unJoinCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(finishCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(finishCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successMessage = action.payload.msg
      })
      .addCase(finishCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.coursesCategories = action.payload
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(loadCourses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loadCourses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.courses = action.payload[0]
        state.currentCategory = action.payload[1]
      })
      .addCase(loadCourses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer