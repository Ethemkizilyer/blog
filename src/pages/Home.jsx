import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useFetch } from "../auth/functions";
import Card from "../components/Card";
import loading from "../assets/loading.gif";

const Home = () => {
  const { isLoading, cardList } = useFetch();
  useEffect(()=> {
localStorage.setItem("like", JSON.stringify(false));
  },[])

  return (
    <div>
      {!isLoading ? (
        <div className="flex flex-wrap gap-6 justify-center items-center ">
          {!cardList?.length && (
            <p className="text-2xl uppercase mx-auto text-center">
              Boş
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
