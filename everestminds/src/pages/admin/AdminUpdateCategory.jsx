import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import { updateCategory, reset } from '../../features/admin/adminSlice'

function AdminUpdateCategory() {
    const [formData,setFormData] = useState({
        name: '',
      })
    
      const {name } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let params = useParams()

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

        const categoryData = {
            name,
        }

        
        dispatch(updateCategory([params.category,categoryData]))
        
    }
    
    if (isLoading) {
      return <Spinner />
    }
  return (
    <>

    <h1>
        Update Category  
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
                placeholder="Enter New Category name" 
                onChange={onChange} />
            </div>                            
            <div className="form-group">
                <button type="submit" className='btn btn-block'>
                    Update
                </button>
            </div>
        </form>
    </section>
    </>
  )
}

export default AdminUpdateCategory