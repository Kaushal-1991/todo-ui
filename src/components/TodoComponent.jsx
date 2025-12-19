import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import { addTodoApp, getTodo, updateTodoData } from '../service/TodoService';

const TodoComponent = () => {

  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [completed,setCompleted] = useState(false);

  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      title,
      description,
      completed
    };
    if(id){
      updateTodoData(id,todo).then((response) => {
         console.log("Data updated succesfully !!!",response.data);
         toast.success('Todo updated successfully')         
         navigate("/todo");
      });
    }
    else{
      addTodoApp(todo).then((response) => {
      console.log("Data submitted succesfully !!!",response.data);
      toast.success('Todo Submiited successfully')
      navigate("/todo");
      }).catch((error) =>{
        console.log(error)
        const apiMessage = error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Login failed';
        toast.success("You are not authorized: " + apiMessage);
      });
    }
  }
  
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      getTodo(id)
        .then((response) => {
          setTitle(response.data.title || '');
          setDescription(response.data.description || '');
          setCompleted(response.data.completed ?? false);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);
  

  const pageTitle = () => { {
        if (id) {
            return <h3 className="text-center">Update Todo</h3>
        } else {
            return <h3 className="text-center">Add Todo</h3>
        }
 }}

  return (
    <div>
      <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-header">{pageTitle()}</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label className="form-label">Title :</label>
                            <input
                                type="text"
                                placeholder="Enter Title Name"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group mb-2">
                            <label className="form-label">Description :</label>
                            <input
                                type="text"
                                placeholder="Enter Description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group mb-2">
                          <label className="form-label">Completed :</label>
                          <select
                            className='form-control'
                            value={completed ? 'true' : 'false'}
                            onChange={(e) => setCompleted(e.target.value === 'true')}
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        
                        <button type="submit" className="btn btn-success float-end">
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger float-end" style={{ marginRight: "10px" }} onClick={() => navigate('/todo')}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default TodoComponent