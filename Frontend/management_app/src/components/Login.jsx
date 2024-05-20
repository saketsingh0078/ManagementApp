import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const Login = ({setUser}) => {
    const navigate=useNavigate();
    const [formDetails, setFormDetails]=useState({
      email: "",
      password:""
    });
    const{email,password}=formDetails;
    const handleLogin = (e) => {
      e.preventDefault();
      axios.post('http://localhost:1234/api/signin', {email,password})
      .then(res => {
        setUser(res.data);
        toast("Login Successfully");
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        toast("Network Error, Login Failed");
      });

    }
    function handleChange(e){
      setFormDetails({
        ...formDetails,
        [ e.target.name]: e.target.value
      })
    
    }
  return (
    <>
      <ToastContainer/>
      <div className="bg-gray-500 min-h-screen flex justify-center items-center">
        <div className="bg-slate-100 max-w-md p-4">
          <div>
            <h1 className="font-medium text-lg mb-4">Sign In</h1>
            <p className="text-md font-medium mt-4">Enter your credentials to access your account</p>
          </div>

          <div>
            <form action="" method="POST" onSubmit={handleLogin}>

              <label className="block text-sm font-medium text-gray-700 mt-4" htmlFor="email">Email</label> <br />
              <input className="mt-1 block w-full rounded-lg p-2" type="email" name="email" id="email" value={formDetails.email} onChange={handleChange} required/> <br />
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label> <br />
              <input className="mt-1 block w-full rounded-lg p-2" type="password" name="password" id="password" value={formDetails.password} onChange={handleChange} required /> <br />
              <button type='submit' className="w-full bg-blue-500 text-white py-2 px-4 rounded">Sign In</button> <br />
            </form>
          </div>

          <div className="flex justify-between ml-4 mr-4 mt-4">
            <p>Don't have an account?</p>
            <NavLink className="text-blue-500" to="/signup">Sign Up</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
