import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { userObserver } from "../auth/firebase";
import New from "../pages/New";
import Details from "../pages/Details";
import Navbar from "../components/Navbar";

const AppRouter = () => {
  let currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    userObserver(dispatch);
  }, [currentUser]);
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new" element={<New />} />
        <Route path="/:title" element={<Details />} />
      </Routes>
    </>
  );
};

export default AppRouter;
