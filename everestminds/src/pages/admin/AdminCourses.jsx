import { useEffect } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import CourseAdminItem from '../../components/CourseAdminItem'
import { FaRegPlusSquare } from 'react-icons/fa'
import { listCourses, reset } from '../../features/admin/adminSlice'

function AdminCourses() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user } = useSelector((state) => state.auth)
    const { courses, isSuccess, successMessage,isLoading, isError, message } = useSelector(
      (state) => state.admin
    )
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }

      if (isSuccess && successMessage) {
        toast.success(successMessage)
      }
  
      dispatch(listCourses())
  
      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, successMessage ,message, dispatch])
  
    if (isLoading) {
      return <Spinner />
    }
  return (
    <>

    <h1>
        Courses List 
        <Link className='addLink' to="/admin/courses/add">
            <FaRegPlusSquare />
        </Link>
    </h1>
    <section>
        {courses.length > 0 ?
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Points</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course) => (
                    <CourseAdminItem key={course._id} course={course} />
                ))}
            </tbody>
        </table>
        :
        <div>No courses in the system.</div>
        }
        
    </section>
    </>
  )
}

export default AdminCourses