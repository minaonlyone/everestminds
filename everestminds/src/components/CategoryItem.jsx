import { useDispatch } from 'react-redux'
import { loadCourses } from '../features/user/userSlice'
import {FaTh} from 'react-icons/fa'
function CategoryItem({ category }) {
  const dispatch = useDispatch()

  return (
    <div className='category'>
      <h2>{category.name} </h2>      
      <button onClick={() => dispatch(loadCourses(category._id))} className="viewCategory"> <FaTh /> View Courses </button>
    </div>
  )
}

export default CategoryItem