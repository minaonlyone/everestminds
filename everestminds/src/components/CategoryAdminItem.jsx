import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCategory } from '../features/admin/adminSlice'
import {FaEdit,FaWindowClose} from 'react-icons/fa'
function CategoryAdminItem({ category }) {
  const dispatch = useDispatch()

  return (
    <tr>
      <td>{category._id} </td>      
      <td>{category.name} </td>      
      <td>
        <Link className="btn-primary" to={"/admin/categories/update/" + category._id}>
            <FaEdit /> Update
        </Link>
      <button onClick={() => dispatch(deleteCategory(category._id))} className="btn-danger"> <FaWindowClose /> Delete </button>
      </td>
      </tr>
  )
}

export default CategoryAdminItem