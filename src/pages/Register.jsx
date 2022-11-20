import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../auth/firebase";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleRegister = (e) => {
    e.preventDefault();
    const displayName = registerUser.username;
    const email = registerUser.email;
    const password = registerUser.password;
    createUser(email, password, navigate, displayName, dispatch);
    console.log(email, password, displayName);
  };
  return (
      <section className="h-[70vh]">
        <div className="px-6  text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-[50vw] mx-auto"
                alt="Login"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              {/* Name input */}
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput1"
                  placeholder="UserName"
                  value={registerUser?.username}
                  onChange={(e) =>
                    setRegisterUser({
                      ...registerUser,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              {/* Email input */}
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                  value={registerUser?.email}
                  onChange={(e) =>
                    setRegisterUser({ ...registerUser, email: e.target.value })
                  }
                />
              </div>
              {/* Password input */}
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput3"
                  placeholder="Password"
                  value={registerUser?.password}
                  onChange={(e) =>
                    setRegisterUser({
                      ...registerUser,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-between text-center flex-col lg:flex-row gap-4 items-center lg:justify-center">
                <button
                  type="button"
                  className="w-32 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={handleRegister}
                >
                  Register
                </button>
               
              </div>
            </div>
          </div>
        </div>
      </section>
   
  );
};

export default Register;
