import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUser } from '../auth/firebase';
import { useDispatch } from "react-redux"

const Register = () => {
  const navigate=useNavigate()
  const [values,setValues]= useState()
 const dispatch = useDispatch();

  

    const changeHandler = (event) => {
      event.preventDefault()
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
      // createUser(name);

    };

    const ethem=(e)=>{
     e.preventDefault();
     console.log(values)
     createUser(values,dispatch,navigate)
    }

  return (
    <div className="w-[100%] h-[90vh] p-4 border">
      <div>
        <div className="block p-6 rounded-lg shadow-lg mx-auto bg-white max-w-md">
          <form onSubmit={ethem}>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-6">
                <input
                  type="text"
                  className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
               
                  placeholder="First name"
                  name="displayName"
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group mb-6">
                <input
                  type="text"
                  className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                 
              
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="form-group mb-6">
              <input
                type="email"
                className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

                placeholder="Email address"
                name="email"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
             
                placeholder="Password"
                name="password"
                onChange={changeHandler}
              />
            </div>
            
            <button
           
              className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
              onChange={changeHandler}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register