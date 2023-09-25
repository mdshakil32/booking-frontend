import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Flight from "@/components/SVG/FlightSVG";
import Hotel from "@/components/SVG/HotelSVG";
import { useRouter } from "next/router";
import Flights from "@/components/Flights";
import Hotels from "@/components/Hotels";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const router = useRouter();

  const handleClick = (name) => {
    router.push({
      pathname: router.pathname,
      query: { search: name },
    });
  };

  return (
    <div className="">
      <ToastContainer
        position="bottom-left"
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container py-10">
        {/* ======= Heading ====== */}
        <div className="shadow-lg max-w-[400px] w-full mx-auto px-10 flex items-center justify-center rounded-xl overflow-hidden">
          <div
            onClick={() => handleClick("flight")}
            className={`${
              router.query.search !== "hotel"
                ? " border-blue-600"
                : "border-transparent"
            } group border-b-2 py-4 px-10 flex items-center space-x-1.5 select-none cursor-pointer duration-300`}
          >
            <Flight />
            <p className="text-gray-600 font-bold ">Flight</p>
          </div>
          <div
            onClick={() => handleClick("hotel")}
            className={`${
              router.query.search === "hotel"
                ? " border-blue-600"
                : "border-transparent"
            } group border-b-2 py-4 px-10 flex items-center space-x-1.5 select-none cursor-pointer duration-300`}
          >
            <Hotel />
            <p className="text-gray-600 font-bold">Hotel</p>
          </div>
        </div>
        {/* ========== forms ======== */}

        {router.query.search === "hotel" ? <Hotels /> : <Flights />}
      </div>
    </div>
  );
};
export default Home;
