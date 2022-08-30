import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import CourseShowItem from '../components/CourseShowItem'
import CategoryItem from '../components/CategoryItem'
import { getAllCategories, reset } from '../features/user/userSlice'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user } = useSelector((state) => state.auth)
    const { courses, currentCategory ,coursesCategories, isSuccess, successMessage,isLoading, isError, message } = useSelector(
      (state) => state.user
    )
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }

      if(isSuccess && successMessage){
        toast.success(successMessage)
      }
  

      dispatch(getAllCategories())
  
      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, successMessage ,message, dispatch])
  
    if (isLoading) {
      return <Spinner />
    }
  return (
    <>

    <section>
        <h2 className='leftText'>Courses Categories:</h2>
        {coursesCategories.length > 0 ? (
          <div className='categories'>
            {coursesCategories.map((category) => (
              <CategoryItem key={category._id} category={category} />
            ))}
          </div>
        ) : (
          <h3>No Categories at the moment..</h3>
        )}
    </section>

    {currentCategory.length > 0 ? 
    <section>
        <h2 className='leftText'>Courses:</h2>
        {courses.length > 0 ? (
            <div className='courses'>
            {courses.map((course) => (
                <CourseShowItem key={course._id} course={course} />
            ))}
            </div>
        ) : (
            <h3>No Courses in this category..</h3>
        )}
        </section>
    :null}
    </>
  )
}

export default Dashboard