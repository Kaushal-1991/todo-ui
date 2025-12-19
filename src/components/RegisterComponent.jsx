import React, { useState } from 'react'
import { NavLink} from 'react-router-dom';

import { registerUserAPi } from '../service/AuthService';
const RegisterComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        const user = {
            name,
            email,
            password,
            username
        };
        setErrorMsg('');
        setSuccessMsg('');
        registerUserAPi(user).then((response) => {
            console.log("User registered successfully !!!", response.data);
            const apiMessage = response?.data?.message || 'Registration successful';
            setSuccessMsg(apiMessage);
            setErrorMsg('');
            setName('');
            setEmail('');
            setPassword('');
            setUsername('');
        }).catch((error) =>{
            console.log(error);
            const apiMessage = error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Registration failed';
            setErrorMsg(apiMessage);
            setSuccessMsg('');
        });
    };

  return (
    <div className='container'>
        <br/><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <div className='card-header'>
                    User Registration
                </div>
                <div className='card-body'>
                    {successMsg && <div className='alert alert-success'>{successMsg}</div>}
                    {errorMsg && <div className='alert alert-danger'>{errorMsg}</div>}
                    <form>
                        <div className='form-group mb-2'></div>
                            <label className='form-label'>Name :</label>
                            <input type='text' placeholder='Enter Name' name='name'
                            className='form-control' value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <div className='form-group mb-2'></div>
                            <label className='form-label'>Email :</label>
                            <input type='email' placeholder='Enter Email' name='email' 
                            className='form-control' value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <div className='form-group mb-2'></div>
                            <label className='form-label'>Password :</label>
                            <input type='password' placeholder='Enter Password' name='password'
                            className='form-control' value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <div className='form-group mb-2'></div>
                            <label className='form-label'>Username :</label>
                            <input type='text' placeholder='Enter Username' name='username'
                            className='form-control' value={username}
                            onChange={(e) => setUsername(e.target.value)} /><br/>
                        <button className='btn btn-success' type='submit' onClick={(e) => handleRegistrationSubmit(e)}>Register</button>
                        <span className="ms-2">
                            Already Registered?{" "}
                            <NavLink to="/login" className="text-primary text-decoration-underline">
                                Login Here
                            </NavLink>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterComponent