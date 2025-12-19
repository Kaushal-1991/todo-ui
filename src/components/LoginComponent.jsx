import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUserApi, savedLoggedInUser, storeToken } from '../service/AuthService';

const LoginComponent = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    

    const navigate = useNavigate();


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log("Attempting login with:", { username, password });
        setErrorMsg('');
        await loginUserApi(username,password).then((response) => {
            console.log("User logged in successfully !!!", response.data);
            const token = "Basic " + window.btoa(username + ":" + password);
            storeToken(token);
            savedLoggedInUser(username);
            setErrorMsg('');
            navigate("/todo");
            window.location.reload(false);
        }).catch((error) => {
            console.log(error);
            const apiMessage = error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Login failed';
            setErrorMsg(apiMessage);
            setTimeout(() => {
                setErrorMsg('');
            }, 5000);
        });

    };

  return (
    <div className='container'>
        <br/><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <div className='card-header'>
                    User Login
                </div>
                <div className='card-body'>
                    {errorMsg && <div className='alert alert-danger'>{errorMsg}</div>}
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Username :</label>
                            <input type='text' placeholder='Enter Username' name='username'
                            className='form-control' value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Password :</label>
                            <input type='password' placeholder='Enter Password' name='password'
                            className='form-control' value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <br/>
                        <button className='btn btn-success' type='submit' onClick={(e) => handleLoginSubmit(e)}>Login</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
  )
}

export default LoginComponent