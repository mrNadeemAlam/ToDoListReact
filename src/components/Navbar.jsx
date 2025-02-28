import React from "react";
import logo from "../assets/icon.png"


const Navbar = () => {
  return (
    <nav className="flex justify-between px-5 bg-blue-400 text-white py-3">
      <div className="logo flex font-bold text-xl cursor-pointer">
        MyTask
        <img src={logo} alt="" width={"30"}/>
        </div>
      <ul className="flex gap-5">
        <li className="cursor-pointer font-bold hover:opacity-80">Home</li>
        <li className="cursor-pointer font-bold hover:opacity-80">Your Task</li>
      </ul>
    </nav>
  );
};

export default Navbar;
