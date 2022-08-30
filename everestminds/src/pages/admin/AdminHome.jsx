import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaRegUser,FaBars,FaLaptop} from 'react-icons/fa'
import { useSelector } from 'react-redux'

function AdminHome() {
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)
  
    useEffect(() => {

      if (!user) {
        navigate('/login')
      }
  
    }, [user, navigate])
  
  return (
    <>
    <section>
        <h1>Available Actions</h1>
        <br />
        <ul className='adminList'>
            <li>
                <Link className='btn' to='/admin/users'>
                    <FaRegUser /> Users
                </Link>
            </li>
            <li>
                <Link className='btn' to='/admin/categories'>
                    <FaBars /> Categories
                </Link>
            </li>
            <li>
                <Link className='btn' to='/admin/courses'>
                    <FaLaptop /> Courses
                </Link>
            </li>
        </ul>
        
    </section>
    
    </>
  )
}

export default AdminHome