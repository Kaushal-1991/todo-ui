import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTodoData, getAllTodo } from '../service/TodoService';
import ConfirmModal from './ConfirmModal';
import { toast } from 'react-toastify'


const ListTodoComponent = () => {


   /* let dummyData = [
        {
        "title": "title1",
        "description" : "description 1",
        "completed" : false
        },
        {
        "title": "title2",
        "description" : "description 2",
        "completed" : false
        },
    ]; */

const [todo,setTodo]= useState([]);
const [confirmOpen, setConfirmOpen] = useState(false);
const [confirmId, setConfirmId] = useState(null);
const navigate = useNavigate();
const {id} = useParams();

function allTodo(){
   getAllTodo().then((response) => {
    setTodo(response.data);
    console.log("Todo API Response >>>", response.data)
  }).catch((error)=>console.error(error))
}

useEffect((() =>{
    allTodo();
}),[]);

function addTodo(){
  navigate('/add-todo');
}

function updateTodo(id){
   navigate(`/edit-todo/${id}`);
}

function askDelete(id){
  setConfirmId(id);
  setConfirmOpen(true);
}

function confirmDelete(){
  if (!confirmId) return;
  deleteTodoData(confirmId).then((response) => {
    setConfirmOpen(false);
    setConfirmId(null);
    allTodo();
    toast.success('Todo Deleted successfully')
    console.log(response.data);
  }).catch((error) => {
    console.error(error);
    setConfirmOpen(false);
    setConfirmId(null);
  });
}

function cancelDelete(){
  setConfirmOpen(false);
  setConfirmId(null);
}

  return (
    <div className='container mt-4'>
      <h3 className='text-center'>List Of TODO</h3>
      <button className='btn btn-primary mb-2' onClick={addTodo}>Add Todo</button>
      <table className='table table-striped table-bordered'>
           <thead>
               <tr>
                  <td>S.No</td>
                  <td>Title</td>
                  <td>Description</td>
                  <td>Completed</td>
                  <td>Action</td>
               </tr>
           </thead>
           <tbody>
                 {
                   todo.length === 0 ? (
                    <tr>
                      <td colSpan={5} className='text-center text-danger'>No Records Found !!!</td>
                    </tr>
                   ) : (todo.map((todos, index) => (
                    <tr key={todos.id}>
                    <td>{index + 1}</td>
                    <td>{todos.title}</td>
                    <td>{todos.description}</td>
                    <td>{todos.completed ? "Yes" : "No"}</td>
                    <td>
                      <button className='btn btn-primary btn-sm mr-5' onClick={() => updateTodo(todos.id)}>Update</button>
                      <button className='btn btn-danger btn-sm' style={{ marginLeft: "10px" }} onClick={() => askDelete(todos.id)}>Delete</button>
                      <button className='btn btn-sucess btn-sm' style={{ marginLeft: "10px" }}>Completed</button>
                      <button className='btn btn-info btn-sm' style={{ marginLeft: "10px" }}>In Completed</button>

                    </td>
                    </tr> )
                ))}
              
           </tbody>
        </table>
         <ConfirmModal
           show={confirmOpen}
           title="Delete Todo"
           message="Are you sure you want to delete this todo?"
           onConfirm={confirmDelete}
           onCancel={cancelDelete}
         />
    </div>
  )
}

export default ListTodoComponent