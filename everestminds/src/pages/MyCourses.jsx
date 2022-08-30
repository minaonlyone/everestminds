import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import CourseItem from '../components/CourseItem'
import { getMyCourses,getMyPoints, reset } from '../features/user/userSlice'

function MyCourses() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user } = useSelector((state) => state.auth)
    const { myPoints,myCourses, isSuccess, successMessage,isLoading, isError, message } = useSelector(
      (state) => state.user
    )
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }

      if(isSuccess && successMessage){
        toast.success(successMessage)
      }
  
      if (!user) {
        navigate('/login')
      }
  
      dispatch(getMyCourses())
      dispatch(getMyPoints())
      
  
      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, successMessage ,message, dispatch])
  
    if (isLoading) {
      return <Spinner />
    }
  return (
    <>
     {user && user.name ? 
     <>
     <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <h6>Total Points: {myPoints}</h6>
      </section>
      
      <section>
        <h2 className='leftText'>Your Courses:</h2>
        {myCourses.length > 0 ? (
          <div className='courses'>
            {myCourses.map((course) => (
              <CourseItem key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <h3>You are not enrolled in any course.</h3>
        )}
      </section>
        </>
      : null }

    </>
  )
}

export default MyCourses