import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useFetch } from "../auth/functions";
import Card from "../components/Card";
import loading from "../assets/loading.gif";

const Home = () => {
  const { isLoading, cardList } = useFetch();

  return (
    <div>
      <Navbar />
      <div className="flex justify-center gap-2 mb-12 items-center">
        <span className="w-[200px] h-2 bg-black"></span>
        <p className="text-2xl uppercase">Dashboard</p>
        <span className="w-[200px] h-2 bg-black "></span>
      </div>
      {!isLoading ? (
        <div className="flex flex-wrap gap-6 justify-center items-center ">
          {!cardList?.length && (
            <p className="text-2xl uppercase mx-auto text-center">
              Blog does not exist Go to newBlog page to add
            </p>
          )}
          {cardList?.map((item, index) => (
            <Card item={item} key={index} />
          ))}
        </div>
      ) : (
        <div>
          <img src={loading} alt="" className="mt-20 mx-auto" />
        </div>
      )}
    </div>
  );
};

export default Home;
