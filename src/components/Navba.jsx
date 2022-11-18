import React from 'react'
import { AiFillPlusCircle, IconName } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../auth/firebase';

const Navba = () => {
const navigate=useNavigate()
const dispatch=useDispatch()
const { user } = useSelector((state) => state.auth);
    const newblog= ()=> {
navigate("new")
    }
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light h-[10vh]">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <div className="items-center">
          <Link
            className="text-white opacity-60 hover:opacity-80 focus:opacity-80 mr-4"
            to="/"
          >
            BLOG
          </Link>
        </div>
        <div className="dropdown relative flex gap-4">
          {user && <h5 className="mr-2 capitalize bg-white">{user.username}</h5>}
          <AiFillPlusCircle onClick={() => newblog()} className="text-xl" />

          <Link
            className="dropdown-toggle flex items-center hidden-arrow"
            to="/new"
            id="dropdownMenuButton2"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://mdbootstrap.com/img/new/avatars/2.jpg"
              className="rounded-full"
              style={{ height: "25px", width: "25px" }}
              alt=""
              loading="lazy"
            />
          </Link>
          <ul
            className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
            aria-labelledby="dropdownMenuButton2"
          >
            <li>
              <Link
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                to="/register"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                to="/"
                onClick={() => logOut(navigate, dispatch)}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navba