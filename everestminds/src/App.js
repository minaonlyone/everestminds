import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Unauthorized from './pages/Unauthorized'
import Dashboard from './pages/Dashboard'
import AdminHome from './pages/admin/AdminHome'
import AdminUsers from './pages/admin/AdminUsers'
import AdminAddUsers from './pages/admin/AdminAddUsers'
import AdminCategories from './pages/admin/AdminCategories'
import AdminAddCategory from './pages/admin/AdminAddCategory'
import AdminUpdateCategory from './pages/admin/AdminUpdateCategory'
import AdminCourses from './pages/admin/AdminCourses'
import AdminAddCourses from './pages/admin/AdminAddCourses'
import AdminUpdateCourse from './pages/admin/AdminUpdateCourse'
import MyCourses from './pages/MyCourses'
import Login from './pages/Login'
import Register from './pages/Register'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>

            <Route path='admin' element={<RequireAuth allowedRoles={["Admin"]} />}>
              <Route index element={<AdminHome />} />
              <Route path='users' element={<AdminUsers />} />
              <Route path='users/add' element={<AdminAddUsers />} />
              <Route path='categories' element={<AdminCategories />} />
              <Route path='categories/update/:category' element={<AdminUpdateCategory />} />
              <Route path='categories/add' element={<AdminAddCategory />} />
              <Route path='courses' element={<AdminCourses />} />
              <Route path='courses/add' element={<AdminAddCourses />} />
              <Route path='courses/update/:course' element={<AdminUpdateCourse />} />

            </Route>

            <Route element={<RequireAuth allowedRoles={["User"]} />}>
              <Route path='/myCourses' element={<MyCourses />} />
            </Route>

            <Route path='/' element={<Dashboard />} />
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
