import React from 'react'
import './navbaar.css'
import { RxDragHandleHorizontal } from "react-icons/rx";
function navbaar() {

  return (
    <>
      <div className='bg-neutral-900 text-slate-100 flex justify-between px-10 py-5 text-lg ' id='container'>
        <div>Task Manager</div>
        <RxDragHandleHorizontal id='handle'/>
        <div className='container1 flex gap-10' id='container1'>
          <div class="change">Home</div>
          <div>About</div>
          <div>Contact Us</div>
        </div>
        {/* <div className='gap-10' id='container2'>
          <div>Home</div>
          <div>About</div>
          <div>Contact Us</div>
        </div> */}
      </div>
    </>
  )
}


export default navbaar
