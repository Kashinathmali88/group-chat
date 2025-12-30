import { Outlet } from "react-router-dom";
import React from "react";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      {/* <!-- Phone Body --> */}
      <div className="relative w-[320px]  h-160 bg-black rounded-[55px] shadow-2xl">
        {/* <!-- Outer Frame --> */}
        <div className="absolute inset-1.5 rounded-[48px] overflow-hidden">
          {/* <!-- Notch --> */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-37.5 h-7.5 bg-black rounded-b-3xl z-10"></div>
          {/* <!-- Screen --> */}
          <Outlet />
          {/* <!-- Screen --> */}
          {/* <!-- Home Indicator --> */}
          <div className="absolute bottom-2 w-full flex justify-center">
            <div className="w-24 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
