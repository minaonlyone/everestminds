import { useEffect } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import CategoryAdminItem from '../../components/CategoryAdminItem'
import { FaRegPlusSquare } from 'react-icons/fa'
import { getAllCategories, reset } from '../../features/user/userSlice'
import { listUsers } from '../../features/admin/adminSlice'

function AdminCategories() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user } = useSelector((state) => state.auth)
    const { coursesCategories } = useSelector((state) => state.user)
    const { users, isSuccess, successMessage,isLoading, isError, message } = useSelector(
      (state) => state.admin
    )
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }

      if (isSuccess && successMessage) {
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

    <h1>
        Categories List 
        <Link className='addLink' to="/admin/categories/add">
            <FaRegPlusSquare />
        </Link>
    </h1>
    <section>
        {coursesCategories.length > 0 ?
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {coursesCategories.map((category) => (
                    <CategoryAdminItem key={category._id} category={category} />
                ))}
            </tbody>
        </table>
        :
        <div>No categories in the system.</div>
        }
        
    </section>
    </>
  )
}

export default AdminCategories