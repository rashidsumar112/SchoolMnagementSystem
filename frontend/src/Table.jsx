import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { toast } from "react-toastify";
import axios from 'axios';



function Form({data,getAllenquiry,setformData}) {
  
let DeleteRow=(delId)=>{
  
  axios.delete(`http://localhost:1020/api/website/enquiry/delete/${delId}`)
  .then((res)=>{
    if(!res?.data?.status){
      toast.error(res?.data?.MSG || 'Unable to delete enquiry')
      return
    }
    toast.success("Enquiry is Deleted Successfully")
    getAllenquiry()
  }).catch((err)=>{
    toast.error(err?.response?.data?.MSG || 'Unable to delete enquiry')
  })
}
//this for Edit Api
let EditRow=(editid)=>{
  axios.get(`http://localhost:1020/api/website/enquiry/single/${editid}`)
  .then((res)=>{
    let data=res.data
    if(!data?.status){
      toast.error(data?.message || 'Unable to load enquiry')
      return
    }
    setformData(data.enquiry)
  }).catch((err)=>{
    toast.error(err?.response?.data?.message || 'Unable to load enquiry')
  })

}







  return (
     
    <div className='rounded-2xl border border-cyan-100 bg-white/90 p-4 shadow-lg shadow-cyan-100/70 dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-black/30 sm:p-5'>
     
      <h1 className='mb-4 text-lg font-bold text-slate-900 dark:text-slate-100 sm:text-xl'>Student List</h1>

      {data.length >= 1 ? (
        <div className='space-y-3 md:hidden'>
          {data.map((item, index) => (
            <div key={index} className='rounded-xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50 p-4 shadow-md dark:border-slate-700 dark:from-slate-900 dark:to-slate-800'>
              <div className='mb-3 flex items-center justify-between'>
                <h2 className='font-semibold text-slate-900 dark:text-slate-100'>{item.name}</h2>
                <span className='rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200'>
                  Roll #{item.rollno}
                </span>
              </div>

              <div className='grid grid-cols-1 gap-1 text-sm text-slate-700 dark:text-slate-300'>
                <p><span className='font-semibold'>Email:</span> {item.email}</p>
                <p><span className='font-semibold'>Father:</span> {item.fathername}</p>
                <p><span className='font-semibold'>Phone:</span> {item.phone}</p>
                <p><span className='font-semibold'>Class:</span> {item.classname}</p>
                <p><span className='font-semibold'>Grade:</span> {item.grade}</p>
              </div>

              <div className='mt-4 flex gap-2'>
                <button onClick={() => EditRow(item._id)} className='flex-1 rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-600'>
                  Edit
                </button>
                <button onClick={() => DeleteRow(item._id)} className='flex-1 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600'>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 md:hidden'>
          No Data Found
        </div>
      )}

      <div className="hidden overflow-x-auto md:block">
      <Table striped hoverable className='rounded-xl'>
        <TableHead >
           
          <TableHeadCell>Student-Name</TableHeadCell>
          <TableHeadCell>Student-Email</TableHeadCell>
          <TableHeadCell>Student-FatherName</TableHeadCell>
          <TableHeadCell>Student-Phone</TableHeadCell>
           <TableHeadCell>Student-RollNo</TableHeadCell>
           <TableHeadCell>Student-Class</TableHeadCell>
           <TableHeadCell>Student-Grade</TableHeadCell>
          <TableHeadCell>
            <span >Delete Record</span>
          </TableHeadCell>
          <TableHeadCell>
            <span >Edit Record</span>
          </TableHeadCell>
        </TableHead>
        
        <TableBody className="divide-y">
       {
          data.length>=1 ?
          data.map((item,index)=>{
         
      return(
      <TableRow key={index} className="bg-white dark:bg-slate-900">
            
         <TableCell>{item.name}</TableCell>
         <TableCell>{item.email}</TableCell>
         <TableCell>{item.fathername}</TableCell>
         <TableCell>{item.phone}</TableCell>
         <TableCell>{item.rollno}</TableCell>
         <TableCell>{item.classname}</TableCell>
         <TableCell>{item.grade}</TableCell>
         <TableCell>
          <button onClick={()=>DeleteRow(item._id)} className="rounded-md bg-red-500 px-3 py-1 text-white transition hover:bg-red-600">Delete</button>
         </TableCell>
         <TableCell>
          <button onClick={()=>EditRow(item._id)} className="rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-600">Edit</button>
         </TableCell>
          </TableRow>
      )
    })
    :

    <TableRow className="bg-white dark:bg-slate-900">
            <TableCell colSpan={9} className="text-center">No Data Found</TableCell>
          </TableRow> 
      } 
          
            
      
        </TableBody>
      </Table>
    </div>
      
       
             
        

       </div>

  )
  
}

export default Form