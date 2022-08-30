import { useDispatch } from 'react-redux'
import { disableUser } from '../features/admin/adminSlice'
import {FaWindowClose} from 'react-icons/fa'

function UserItem({ user }) {
  const dispatch = useDispatch()

  return (
    <tr>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.points}</td>
        <td>{user.roles.join(',')}</td>
        <td>{user.isActive ? "Active" : "Disabled"}</td>
        <td>
            <button onClick={() => dispatch(disableUser(user._id))} className="btn-danger"> <FaWindowClose /> Disable Account </button>
        </td>
    </tr>
  )
}

export default UserItem