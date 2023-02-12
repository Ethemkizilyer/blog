import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useFetch } from "../auth/functions";
import Card from "../components/Card";
import loading from "../assets/loading.gif";
import { useScroll, useSpring, motion } from "framer-motion";
const Home = () => {
  const { isLoading, cardList } = useFetch();
  useEffect(()=> {
localStorage.setItem("like", JSON.stringify(false));
  },[])
 let { scrollYProgress } = useScroll();

 const scaleX = useSpring(scrollYProgress, {
   stiffness: 10000,
   damping: 1000,
 });
  return (
    <div>
      <motion.div
        style={{ scaleX: scaleX }}
        className="bg-gradient-to-r from-yellow-400 to-red-500 fixed-top top-[56px] left-0 right-0 h-[4px] origin-left z-1000"
      />
      {!isLoading ? (
        <div className="flex flex-wrap gap-6 justify-center items-center ">
          {!cardList?.length && (
            <p className="text-2xl uppercase mx-auto text-center">Boş</p>
          )}
          {cardList?.reverse().map((item, index) => (
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
