import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import { getAllCategories } from '../../features/user/userSlice'
import { listCourse,updateCourse, reset } from '../../features/admin/adminSlice'

function AdminUpdateCourse() {    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { coursesCategories } = useSelector((state) => state.user)
    const { currentCourseData, isSuccess, successMessage,isLoading, isError, message } = useSelector(
      (state) => state.admin
    )

    console.log(currentCourseData)

    const [formData,setFormData] = useState({
        name: '', 
        description:  '' ,
        points: '',
        selectedCategories: []
    })

    const { name, description, points, selectedCategories } = formData

    const options = coursesCategories.map((elm) => {
        return {value: elm._id , label: elm.name };
    })



    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
      
      if (isSuccess && successMessage) {
        setFormData({
            name: '', 
            description:  '' ,
            points: '',
            selectedCategories: []
        });
        toast.success(successMessage)
      }    

      dispatch(getAllCategories())
      dispatch(listCourse(params.course))
      
      
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
            name: name ? name : currentCourseData.name,
            description: description ? description : currentCourseData.description,
            points: points ? points : currentCourseData.points,
            category: selectedCategories.length > 0 ? selectedCategories.map((elm) => {
                return elm.value
            }) : currentCourseData.category
        }

        
        dispatch(updateCourse([params.course,courseData]))
        
    }
    
    if (isLoading) {
      return <Spinner />
    }
  return (
    <>

    <h1>
        Update Course  
    </h1>
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                type="text" 
                className='form-control' 
                id="name"  
                name='name' 
                value={name ? name : currentCourseData.name } 
                placeholder="Enter New Category name" 
                onChange={onChange} />
            </div>   
            <div className="form-group">
                <input 
                type="text" 
                className='form-control' 
                id="description"  
                name='description' 
                value={description ? description : currentCourseData.description} 
                placeholder="Enter Course Description" 
                onChange={onChange} />
            </div>
            <div className="form-group">
                <input 
                type="number" 
                className='form-control' 
                id="points"  
                name='points' 
                value={points ? points : currentCourseData.points} 
                placeholder="Enter Course Points" 
                onChange={onChange} />
            </div>  
            <div className="form-group">
                <Select 
                    className="form-control" 
                    name="selectedCategories" 
                    onChange={onChangeCategories} 
                    value={selectedCategories.length > 0 ? selectedCategories : options.filter((category)=>{
                        if(currentCourseData.category && currentCourseData.category.length > 0){
                            return currentCourseData.category.includes(category.value)
                        }
                    })} 
                    isMulti 
                    options={options} />
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

export default AdminUpdateCourse