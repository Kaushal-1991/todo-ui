import axios  from "axios";
const REST_BASE_URL = "http://localhost:8080/api/todos";

axios.interceptors.request.use(function (config) {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  },
  { synchronous: true, runWhen: () => !!localStorage.getItem('token') }
);

export const getAllTodo = () => axios.get(REST_BASE_URL);
export const addTodoApp = (todo) => axios.post(REST_BASE_URL,todo);
export const getTodo = (id) => axios.get(REST_BASE_URL + "/" + id);
export const updateTodoData = (id,todo) => axios.put(REST_BASE_URL + "/" + id,todo);
export const deleteTodoData = (id) => axios.delete(REST_BASE_URL + "/" + id);