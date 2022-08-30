import { useDispatch } from 'react-redux'
import { unJoinCourse, finishCourse } from '../features/user/userSlice'
import {FaWindowClose,FaRegCheckSquare} from 'react-icons/fa'
function CourseItem({ course }) {
  const dispatch = useDispatch()
  return (
    <div className='course'>
      <div>Joined At @ {new Date(course.createdAt).toLocaleString('en-US')}</div>
      <h2>{course.course.name} - {course.course.points} Points</h2>
      <h3>Enrollment status: {course.status}</h3>
      {course.status === "Joined" ? 
      <>
      <button onClick={() => dispatch(finishCourse(course.course._id))} className='finish'> <FaRegCheckSquare /> </button>
      <button onClick={() => dispatch(unJoinCourse(course.course._id))} className='close'> <FaWindowClose /> </button>
      </>
      : null
      }
      
    </div>
  )
}

export default CourseItem