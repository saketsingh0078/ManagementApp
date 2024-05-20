import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:1234/api/signup', { // Ensure the URL is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast("Sign Up Successfully");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(`Error signing up: ${errorData.error}`);
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error("Error signing up");
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-500 min-h-screen flex justify-center items-center">
        <div className="bg-slate-100 max-w-md p-4">
          <div>
            <h1 className="font-medium text-lg mb-4">Sign Up</h1>
            <p className="text-md font-medium mt-4">Enter your information to create an account</p>
          </div>

          <div>
            <form onSubmit={handleSubmit} method="POST">
              <label className="block text-sm font-medium text-gray-700" htmlFor="firstname">First Name</label> <br />
              <input className="mt-1 block w-full rounded-lg p-2" type="text" required name="firstname" id="firstname" value={formData.firstname} onChange={handleChange} /> <br />
              <label className="block text-sm font-medium text-gray-700" htmlFor="lastname">Last Name</label> <br />
              <input className="mt-1 block w-full rounded-lg p-2" type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} /> <br />
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label> <br />
              <input className="mt-1 block w-full rounded-lg p-2" type="email" name="email" id="email" value={formData.email} onChange={handleChange} /> <br />
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label> <br />
              <input className="mt-1 block w-full rounded-lg p-2" type="password" name="password" id="password" value={formData.password} onChange={handleChange} /> <br />
              <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded" disabled={isSubmitting}>Sign Up</button> <br />
            </form>
          </div>

          <div className="flex justify-between ml-4 mr-4 mt-4">
            <p>Already have an account?</p>
            <NavLink className="text-blue-500" to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
