import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import { addCourse, reset } from '../../features/admin/adminSlice'
import { getAllCategories } from '../../features/user/userSlice'

function AdminAddCourse() {
    const [formData,setFormData] = useState({
        name: '',
        description: '',
        points: '',
        selectedCategories: []

    })    
    
    const {name,description,points,selectedCategories } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user } = useSelector((state) => state.auth)
    const { coursesCategories } = useSelector((state) => state.user)
    const { users, isSuccess, successMessage,isLoading, isError, message } = useSelector(
      (state) => state.admin
    )

    const options = coursesCategories.map((elm) => {
        return {value: elm._id , label: elm.name};
    })
    
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
      
      if (isSuccess && successMessage) {
        setFormData({
            name:'',
            description: '',
            points: '',
            selectedCategories: []
        });
        toast.success(successMessage)
      }

      dispatch(getAllCategories())
      
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

    const onChangeCategories = (e) => {
        setFormData((prevState)=>({
            ...prevState,
            ["selectedCategories"]: e
        }))
    }


    const onSubmit = (e) => {
        e.preventDefault()

        const courseData = {
            name,
            description,
            points,
            category: selectedCategories.map((elm) => {
                return elm.value
            })
        }
        
        dispatch(addCourse(courseData))
        
    }
    
    if (isLoading) {
      return <Spinner />
    }
  return (
    <>

    <h1>
        Add New Course  
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
                placeholder="Enter Course name" 
                onChange={onChange} />
            </div>                            
            <div className="form-group">
                <input 
                type="text" 
                className='form-control' 
                id="description"  
                name='description' 
                value={description} 
                placeholder="Enter Course Description" 
                onChange={onChange} />
            </div>
            <div className="form-group">
                <input 
                type="number" 
                className='form-control' 
                id="points"  
                name='points' 
                value={points} 
                placeholder="Enter Course Points" 
                onChange={onChange} />
            </div>      
                                  
            <div className="form-group">
                <Select 
                    className="form-control" 
                    name="selectedCategories" 
                    onChange={onChangeCategories} 
                    value={selectedCategories} 
                    isMulti 
                    options={options} />
            </div>      

            <div className="form-group">
                <button type="submit" className='btn btn-block'>
                    Add Course
                </button>
            </div>
        </form>
    </section>
    </>
  )
}

export default AdminAddCourse