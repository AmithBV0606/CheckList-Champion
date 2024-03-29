import React from "react";
import { TbChecklist } from "react-icons/tb";

function Navbar() {
  return (
    <nav className="flex justify-between bg-[#662E9B] text-white py-2">

        <div className="logo mx-8 text-lg flex justify-center items-center gap-2">
            <span className="text-5xl"><TbChecklist /></span>
            <span>CheckList Champion</span>
        </div>

      <ul className="flex gap-10 mx-8">
        <li className="cursor-pointer hover:font-bold transition-all hover:duration-300">
          Home
        </li>

        <li className="cursor-pointer hover:font-bold transition-all hover:duration-300">
          Your Tasks
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;
