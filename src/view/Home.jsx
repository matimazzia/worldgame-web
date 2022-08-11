import React from "react";
import {Game} from "./components/Game.jsx"
import {Footer} from "./components/Footer.jsx"
import {Navbar} from "./components/Navbar.jsx"


export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center relative bg-[#005f73] h-full w-full">
      <div className="fixed top-0">
        <Navbar />
      </div>
      <div>
        <Game />
      </div>
      <div className="fixed bottom-0">
        <Footer/>
      </div>
    </div>
  );
};
