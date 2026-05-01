import React from 'react'
import { Button,Label,TextInput } from 'flowbite-react'
import axios from 'axios'
import Table from './Table'
import { useState ,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function FormWithTable() {
  
let [formData,setformData]=useState({
         name:'',
        email:'',
        fathername:'',
        phone:'',
        rollno:'',
        classname:'',
        grade:'',
  //this work only for update
   _id:''
})


      let getValue=(e)=>{
      let inputName= e.target.name
      let InputValue=e.target.value
      let oldData={...formData}

       oldData[inputName]=InputValue
       setformData(oldData)
      }


//this for View Api
let [enquiryList,setenquiryList]=useState([])
let [isDarkMode,setIsDarkMode]=useState(() => {
  const savedTheme = localStorage.getItem('theme')
  return savedTheme ? savedTheme === 'dark' : true
})

let getAllenaquiry = () =>{
  axios.get('http://localhost:1020/api/website/enquiry/view').then((res)=>{
   return res.data
   
  }).then((finalData)=>{
    if(finalData.status){
      setenquiryList(finalData.enquiryList)
    }

  }).catch((err)=>{
    const message = err?.response?.data?.msg || err?.response?.data?.message || 'Unable to fetch student list'
    toast.error(message)

  })
}

//here we call the getAllenaquiry
//here we call useEffect that will run getAllenquiry repeatdly till enquiry list has array of items ans ,[] items array is empty then it stoped to execeting
//so basically we are calling it Here
useEffect(()=>{
  getAllenaquiry()
},[])

useEffect(() => {
  document.documentElement.classList.toggle('dark', isDarkMode)
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
}, [isDarkMode])

const toggleDarkMode = () => {
  setIsDarkMode((prev) => !prev)
}






// let saveEnquiry=(e)=>{
   
//       //  e.preventDefault()


        

//        axios.post('http://localhost:1020/api/website/enquiry/insert',formData)
//       .then((res)=>{
      
// //  this like method of reset when data is entered in all filed then again all field will be empty for next data
// //  this pop-up message that we received when data is saved succfelly

//        setformData({
//         name:'',
//         email:'',
//         fathername:'',
//         phone:'',
//         rollno:'',
//         classname:'',
//         grade:''

//          })
   
 

//         }).catch((err)=>{
//           console.log(err)
//         })



//   }
 let saveEnquiry=(e)=>{
   
    e.preventDefault()

    // let formData={
    //   name:e.target.name.value,
    //   email:e.target.email.value,
    //   phone:e.target.phone.value,
    //   message:e.target.message.value
    //      }



    //this for update and insert compnent base on condition
if(formData._id){
  //update
  axios.put(`http://localhost:1020/api/website/enquiry/update/${formData._id}`,formData)
  .then((res)=>{
    if(!res?.data?.status){
      toast.error(res?.data?.msg || 'Unable to update enquiry')
      return
    }

    toast.success("Enquiry updated Successfully")
      setformData({
           name:'',
           email:'',
         fathername:'',
         phone:'',
         rollno:'',
         classname:'',
         grade:'',
           _id:''
           

      })
      getAllenaquiry()
}).catch((err)=>{
  const message = err?.response?.data?.msg || err?.response?.data?.message || 'Unable to update enquiry'
  toast.error(message)
})

}
else{
//this for insert 
    axios.post('http://localhost:1020/api/website/enquiry/insert',formData)
    .then((res)=>{
      if(!res?.data?.status){
        toast.error(res?.data?.message || 'Unable to save enquiry')
        return
      }
      
 //this like method of reset when data is entered in all filed then again all field will be empty for next data
 //this pop-up message that we received when data is saved succfelly
 toast.success("Enquiry saved Successfully")
      setformData({
          name:'',
        email:'',
        fathername:'',
        phone:'',
        rollno:'',
        classname:'',
        grade:''
           

      })

  getAllenaquiry()

    }).catch((err)=>{
      const message = err?.response?.data?.message || err?.response?.data?.msg || 'Unable to save enquiry'
      toast.error(message)
    })

  }
 
}









  return (
    <div className='min-h-screen overflow-x-hidden bg-gradient-to-br from-indigo-50 via-sky-50 to-cyan-100 px-3 py-6 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 sm:px-5 lg:px-8'>
        <ToastContainer position='top-right' autoClose={2200} /> 
       <div className='mx-auto max-w-7xl'>
        <div className='mb-6 rounded-2xl border border-white/50 bg-white/70 p-4 shadow-lg backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/70 sm:mb-8 sm:p-6'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='text-center sm:text-left'>
              <h1 className='text-2xl tracking-tight text-slate-900 dark:text-blue-100 sm:text-3xl lg:text-4xl'>Mazari</h1>
              <h1 className='text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl lg:text-4xl'>
                 Student Record Management System DashBoard
              </h1>
              <p className='mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base'>
                Add, edit, and manage student records in one modern dashboard.
              </p>
            </div>

            <button
              type='button'
              onClick={toggleDarkMode}
              className='mx-auto inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:scale-[1.02] hover:from-violet-600 hover:to-indigo-700 sm:mx-0'
            >
              <span>{isDarkMode ? '☀️' : '🌙'}</span>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>

       <div className='grid grid-cols-1 gap-4 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-6'>
          {/*................. this for form on left side.................... */}
                 <div className='h-fit rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-lg shadow-indigo-100/60 dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-black/30 sm:p-5 lg:sticky lg:top-6'>
                 <h2 className='text-lg font-bold text-slate-900 dark:text-slate-100'>Enter Student Record</h2>
                 <p className='mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm'>Fill all details and save your student record.</p>
                

               <form action="" onSubmit={saveEnquiry} >
                
                       <div className='py-2.5 '>
                        
                        <Label  htmlFor='name' value='Student Name' className='mb-1 block text-slate-700 dark:text-slate-200' />
                        <TextInput type='text' sizing='md' value={formData.name} onChange={getValue}  name='name' placeholder='Student Name' required />
                        </div>
                        <div className='py-2.5'>
                      <Label  htmlFor='email' value='Student Email' className='mb-1 block text-slate-700 dark:text-slate-200' />
                        <TextInput type='email' sizing='md' value={formData.email} onChange={getValue} name='email' placeholder='Student Email' required />
                        </div>
                        <div className='py-2.5'>
                           <Label  htmlFor='fathername' value='Student Father Name' className='mb-1 block text-slate-700 dark:text-slate-200' />
                            <TextInput name='fathername' sizing='md' value={formData.fathername} onChange={getValue} placeholder='Student Father Name' required />

                        </div>
                        <div className='py-2.5'>
                       <Label  htmlFor='phone' value='Student Phone' className='mb-1 block text-slate-700 dark:text-slate-200' />
                        <TextInput type='text' sizing='md' value={formData.phone} onChange={getValue} name='phone' placeholder='Enter Student Phone' required />
                        </div>
                        <div className='py-2.5'>
                           <Label  htmlFor='rollno' value='Student Roll No' className='mb-1 block text-slate-700 dark:text-slate-200' />
                            <TextInput name='rollno' sizing='md' value={formData.rollno} onChange={getValue} placeholder='Enter Student Roll No' required />

                        </div>
                        <div className='py-2.5'>
                           <Label  htmlFor='classname' value='Student Class' className='mb-1 block text-slate-700 dark:text-slate-200' />
                            <TextInput name='classname' sizing='md' value={formData.classname} onChange={getValue} placeholder='Enter Student class' required />

                        </div>
                        <div className='py-2.5'>
                           <Label  htmlFor='grade' value='Student Grade' className='mb-1 block text-slate-700 dark:text-slate-200' />
                            <TextInput name='grade' sizing='md' value={formData.grade} onChange={getValue} placeholder='Enter Student Grade' required />

                        </div>
                        <div className='pt-3'>
                           <Button type='submit' className='w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600'>
                            {
                              formData._id?"Update":"Save"
                            }
                            
                            </Button>

                         </div>
                
                  </form>

        </div>
       {/*................. this for table on right side.................... */}
       
        
       <Table data={enquiryList}  getAllenquiry={getAllenaquiry} setformData={setformData} />
       

      </div>
      </div>

    </div>
    
  )
}
