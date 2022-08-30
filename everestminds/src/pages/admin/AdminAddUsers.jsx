import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import { addAdminUser, reset } from '../../features/admin/adminSlice'

function AdminAddUsers() {
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
      })
    
      const {name, email, password, password2} = formData
    
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
        setFormData({
            name: '',
            email: '',
            password: '',
            password2: ''
        });
        toast.success(successMessage)
      }
    
      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, successMessage ,message, dispatch])
  
    const onChange = (e) => {
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

    if (password !== password2) {
        toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }
        
            dispatch(addAdminUser(userData))
        }
    }
    
    if (isLoading) {
      return <Spinner />
    }
  return (
    <>

    <h1>
        Add Admin User 
    </h1>
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                type="text" 
                className='form-control' 
                id="name"  
                name='name' 
                value={name} 
                placeholder="Enter user name" 
                onChange={onChange} />
            </div>  
            <div className="form-group">
                <input 
                type="email" 
                className='form-control' 
                id="email"  
                name='email' 
                value={email} 
                placeholder="Enter user's email address" 
                onChange={onChange} />
            </div>                
            <div className="form-group">
                <input 
                type="password" 
                className='form-control' 
                id="password"  
                name='password' 
                value={password} 
                placeholder="Enter user password" 
                onChange={onChange} />
            </div>         
            <div className="form-group">
                <input 
                type="password" 
                className='form-control' 
                id="password2"  
                name='password2' 
                value={password2} 
                placeholder="Enter user password confirmation" 
                onChange={onChange} />
            </div>         
            <div className="form-group">
                <button type="submit" className='btn btn-block'>
                    Add User
                </button>
            </div>
        </form>
    </section>
    </>
  )
}

export default AdminAddUsers