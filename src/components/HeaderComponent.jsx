import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getLoggedInUser, isLoggedInUser, logoutUserSession } from '../service/AuthService'

const HeaderComponent = () => {
  const isLoggedIn = isLoggedInUser();
  const loggedInUser = getLoggedInUser();
  const navigate = useNavigate();

  function handleLogout() {
    logoutUserSession();
    navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark mb-4 navbar-expand-lg">
        <a className="navbar-brand ps-3" href="#">Todo Management System</a>

        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav">
            {
              isLoggedIn &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/todo">
                  Todo
                </NavLink>
              </li>
            }
           
          </ul>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
                {isLoggedIn && loggedInUser && <span className="nav-link text-white"><b>Welcome, {loggedInUser}!</b></span>} 
          </li>
          {
              !isLoggedIn &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink> 
              </li>
          }

          {
              !isLoggedIn &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
          } 

          {
              isLoggedIn &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
          } 
        </ul>
      </nav>
    </div>
  )
}

export default HeaderComponent
