import React from "react";
import {Smile, CircleGauge, ClipboardList, UsersRound, ChartNoAxesColumnIncreasing, CircleDollarSign, Blocks, ChevronsLeft } from "lucide-react";
const Sidebar: React.FC = () => {
  return (
    <div className="d-flex h-screen p-3 border-solid border-2 border-gray-200 bg-sky-100">
      <div className="flex justify-between ">
        <input type="text" className="bg-sky-200 px-6 py-1 rounded-3xl" />
        <ChevronsLeft className="m-2 text-gray-600"/>
      </div>
      <ul className="nav d-flex justify-center mx-10 my-5 text-gray-600 "> 
        <li className=""><a href="#" className="nav-link flex items-center font-medium"><Smile className="m-4"/> Welcome</a></li>
        <li className=""><a href="#" className="nav-link flex items-center font-medium"><CircleGauge className="m-4"/> Dashboard</a></li>
        <li className=""><a href="#" className="nav-link flex items-center font-medium"><ClipboardList className="m-4"/> Tasks</a></li>
        <li className=""><a href="#" className="nav-link flex items-center font-medium"><UsersRound className="m-4"/> People</a></li>
        <li className=""><a href="#" className="nav-link flex items-center font-medium"><ChartNoAxesColumnIncreasing className="m-4"/> Reports</a></li>
        <li className=""><a href="#" className="nav-link flex items-center font-medium"><CircleDollarSign className="m-4"/> Billing</a></li>
        <li className=""><a href="#" className="nav-link flex items-center font-medium"><Blocks className="m-4"/> Integrations</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;