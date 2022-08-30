import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCourse } from '../features/admin/adminSlice'
import {FaEdit,FaWindowClose} from 'react-icons/fa'
function CourseAdminItem({ course }) {
  const dispatch = useDispatch()

  return (
    <tr>
      <td>{course._id} </td>      
      <td>{course.name} </td>      
      <td>{course.description} </td>      
      <td>{course.points} </td>      
      <td>{course.category.map(function (e) { return e.name; }).join(', ')} </td>      
      <td>
        <Link className="btn-primary" to={"/admin/courses/update/" + course._id}>
            <FaEdit /> Update
        </Link>
      <button onClick={() => dispatch(deleteCourse(course._id))} className="btn-danger"> <FaWindowClose /> Delete </button>
      </td>
      </tr>
  )
}

export default CourseAdminItem