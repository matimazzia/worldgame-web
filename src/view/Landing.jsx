import React from "react";
import video from "../assets/Secuencia01.mp4";
import { NavbarLanding } from "./components/Navbar.landing";

export const Landing = () => {
  return (
    <div>
      <div className="video">
        <video
          loop
          autoPlay
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%,-50%)",
            zIndex: "-1",
          }}
        >
          <source src={video} type="video/mp4"></source>
        </video>
      </div>
        <NavbarLanding />
      <footer className="p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-800 fixed bottom-0 w-full h-24">
        <span className="text-sm  sm:text-center text-gray-400">
          © 2022{" "}
          <a href="https://flowbite.com/" classname="hover:underline">
            WorldGame™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
