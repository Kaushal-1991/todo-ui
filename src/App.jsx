import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ListTodoComponent from './components/ListTodoComponent'
import TodoComponent from './components/TodoComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isLoggedInUser } from './service/AuthService'

function App() {

  function AuthenticatedRoute({ children }) {
    const isAuth = isLoggedInUser();
    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  }

  return (
    <BrowserRouter>
      <HeaderComponent />

      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/todo" element={
          <AuthenticatedRoute>
            <ListTodoComponent />
          </AuthenticatedRoute>
        } />
        <Route path="/add-todo" element={
          <AuthenticatedRoute>
            <TodoComponent />
          </AuthenticatedRoute>
        } />
        <Route path="/edit-todo/:id" element={
          <AuthenticatedRoute>
            <TodoComponent />
          </AuthenticatedRoute>
        } />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>

      <FooterComponent />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
