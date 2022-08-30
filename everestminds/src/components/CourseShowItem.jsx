import { useDispatch,useSelector } from 'react-redux'
import { joinCourse } from '../features/user/userSlice'
import {FaPlusSquare} from 'react-icons/fa'
function CourseShowItem({ course }) {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

  return (
    <div className='course'>
      <div>Publish Date @ {new Date(course.createdAt).toLocaleString('en-US')}</div>
      <h3>{course.name} - {course.description}</h3>
      <h4>{course.points} Points</h4>
      {user && user.name ? 
      <>
      <button onClick={() => dispatch(joinCourse(course._id))} className='close'> <FaPlusSquare /> </button>
      </>
      : null
      }
      
    </div>
  )
}

export default CourseShowItem