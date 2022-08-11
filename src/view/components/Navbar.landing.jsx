import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";


export const NavbarLanding = () => {
const isSpanish= useSelector((state) => state.isSpanish)
    return (
    <div className="h-32 w-full bg-[#bcbcbc] flex items-center justify-between shadow-lg">
        <h1 className="font-sans text-black text-2xl mb-2 ml-10 pt-3">{isSpanish ?"Bienvenidos a Worldgame!": "Welcome to Worldgame!"}</h1>
        <div className="flex items-center justify-between">
            
        <button  className=" w-full h-10 mr-5 py-2 px-8  text-sm font-medium rounded-md text-white bg-[#023047] hover:bg-[#4f8cc6]  hover:text-black " >
                Admin
        </button>
        <button className=" w-full h-10 mr-5 py-2 px-8  text-sm font-medium rounded-md text-white bg-[#023047] hover:bg-[#4f8cc6] hover:text-black ">
                SignIn
        </button>
        </div>
    </div>
  );
};
