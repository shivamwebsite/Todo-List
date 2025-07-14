import { useState,useEffect } from 'react'
import Navbaar from './components/navbaar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [showfinished, setshowfinished] = useState(true)
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [color, setcolor] = useState("bg-black-100");
//     {
//     back : 'bg-violet-100',
//     text :'black'
// }

  useEffect(() => {
    let stringtodo = localStorage.getItem("todos")
    if (stringtodo) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveTOLS = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handlechange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveTOLS();
    toast.success("Successfully Added 😃!", {
      position: "top-center"
  });
  }
  console.log(todos)

  const togglefinish=(e)=>{
    setshowfinished(!showfinished)
  }

  const handlecheckbox = (e, id) => {
    console.log(`the id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
    if(newtodos[index].isCompleted){
      toast.success("Completed  🥳🎉🎊!", {
        position: "top-center"
    });
    }
    saveTOLS();
    notify();
  }

  const handleedit = (e, id) => {
    let t = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(t, id)
    let newt = [...todos]
    setTodo(newt[t].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newtodos);
    saveTOLS();
    toast.success("Editing.. ✏️!", {
      position: "top-center"
  });
  }


  const handledelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newtodos);
    saveTOLS();
    toast.success("Deleted..👍🏼!", {
      position: "top-center"
  });
  }

  const changecolor=()=>{
    let bg=prompt("backgroungcolor");
    // let col=prompt("color");
    // setcolor({back:bg,text:col});
    setcolor(bg);
  }
 console.log(color)
  return (
    < >
      <Navbaar changecolor={changecolor}/>
      <div className={color}>
      <div className="container mx-3 md:mx-auto my-5 bg-violet-100 rounded-xl p-5 min-h-[80vh] md:w-3/4">
        <div className="addtodo">
          <h1 className='font-bold text-xl'>Add a Todo</h1>
          <input className='rounded-xl w-1/2 px-2 py-1 my-5' type="text" value={todo} onChange={handlechange} />
          {
            todo.length > 3 ? <button className='rounded-3xl mx-3 bg-blue-400 px-5 py-2 hover:bg-blue-600 hover:font-bold' onClick={handleAdd}>Add</button> : ""
          }
          {/* <button disabled={todo.length<=3} className='disabled:bg-black disabled:text-white rounded-3xl mx-3 bg-blue-400 px-5 py-2 hover:bg-blue-600 hover:font-bold' onClick={handleAdd}>Add</button> */}
          {/* <button onClick={changecolor}  className='disabled:bg-black disabled:text-white rounded-3xl mx-3 bg-blue-400 px-5 py-2 hover:bg-blue-600 hover:font-bold'> Theme</button> */}
        </div>
        <input type="checkbox" checked={showfinished} onChange={togglefinish}  name="" id="" /> Show Finish
        <div className='h-[1px] bg-black opacity-20 my-2 w-full mx-auto'></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        {todos.length === 0 && <div className='text-lg'>No Todos To Display</div>}
        <div className="todos">
          {todos.map(item => {

            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 justify-between gap-3 my-3">
              <div className='flex gap-2'>
                <input type="checkbox" className='' checked={item.isCompleted} onChange={(e) => { handlecheckbox(e, item.id) }} name="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex gap-2 h-full">
                <button onClick={(e) => { handleedit(e, item.id) }} className='rounded-3xl bg-blue-400 px-3 py-1 hover:bg-blue-600 hover:font-bold'><FaEdit /></button>
                <button onClick={(e) => { handledelete(e, item.id) }} className='rounded-3xl bg-blue-400 px-3 py-1 hover:bg-blue-600 hover:font-bold'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
        <ToastContainer />
      </div>
      </div>
    </>
  )
}

export default App
