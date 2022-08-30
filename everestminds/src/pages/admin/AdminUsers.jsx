import { useEffect } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import UserItem from '../../components/UserItem'
import { FaRegPlusSquare } from 'react-icons/fa'
import { listUsers, reset } from '../../features/admin/adminSlice'

function AdminUsers() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user } = useSelector((state) => state.auth)
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
  
      dispatch(listUsers())
  
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
        Users List 
        <Link className='addLink' to="/admin/users/add">
            <FaRegPlusSquare />
        </Link>
    </h1>
    <section>
        {users.length > 0 ?
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Points</th>
                    <th>Roles</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <UserItem key={user._id} user={user} />
                ))}
            </tbody>
        </table>
        :
        <div>No users in the system.</div>
        }
        
    </section>
    </>
  )
}

export default AdminUsers