"use client";

import React, { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

import MinusSVG from "./SVG/MinusSVG";
import PlusSVG from "./SVG/PlusSVG";

const Passengers = ({
  setAdults,
  adults,
  childs,
  setChilds,
  setClassType,
  classType,
}) => {
  const [dropdown, setDropdown] = useState(false);

  const [totalPassengers, setTotalPassengers] = useState(1);

  const closeDropdown = () => {
    setDropdown(false);
  };

  const handleAdults = (type) => {
    if (type === "plus") {
      setAdults(adults + 1);
    } else {
      adults > 1 && setAdults(adults - 1);
    }
  };

  const handleChilds = (type) => {
    if (type === "plus") {
      setChilds(childs + 1);
    } else {
      childs > 0 && setChilds(childs - 1);
    }
  };

  const dropdownRef = useDetectClickOutside({
    onTriggered: closeDropdown,
  });

  useEffect(() => {
    setTotalPassengers(adults + childs);
  }, [adults, childs]);
  return (
    <div>
      <div
        key="departure-section"
        ref={dropdownRef}
        className="border rounded-xl p-2.5 relative  w-full min-w-[180px]"
      >
        <div
          onClick={() => setDropdown(!dropdown)}
          className="select-none cursor-pointer w-full"
        >
          <p className="text-xs">Traveler, Class</p>
          <div>
            <h1 className="font-semibold ">{totalPassengers}</h1>
            <p className="text-xs">{classType} </p>
          </div>
        </div>

        <div
          className={`${
            dropdown
              ? "h-[230px] overflow-y-auto border"
              : "h-0 overflow-y-hidden"
          } absolute top-20 left-0  w-[240px]  bg-white z-50 rounded-xl shadow-xl `}
        >
          <div className="py-2">
            {/* ==== Adults ==== */}
            <div className="flex items-center justify-between space-x-3 border-b px-3 py-2">
              <p className="text-xs font-semibold">Adults</p>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => handleAdults("minus")}
                  className="w-7 h-7 rounded-full border flex items-center justify-center"
                >
                  <MinusSVG />
                </button>
                <h1 className="text-xs font-semibold">{adults} </h1>
                <button
                  onClick={() => handleAdults("plus")}
                  className="w-7 h-7 rounded-full border  flex items-center justify-center"
                >
                  <PlusSVG />
                </button>
              </div>
            </div>

            {/* ==== Children ==== */}
            <div className="flex items-center justify-between space-x-3 border-b px-3 py-2">
              <p className="text-xs font-semibold">Children</p>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => handleChilds("minus")}
                  className="w-7 h-7 rounded-full border flex items-center justify-center"
                >
                  <MinusSVG />
                </button>
                <h1 className="text-xs font-semibold">{childs} </h1>
                <button
                  onClick={() => handleChilds("plus")}
                  className="w-7 h-7 rounded-full border flex items-center justify-center"
                >
                  <PlusSVG />
                </button>
              </div>
            </div>

            {/* ===== class ==== */}
            <div className="px-3 py-2">
              <p className="text-xs font-semibold mb-2">Class</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    id="Economy"
                    type="radio"
                    value="Economy"
                    checked={classType === "Economy"}
                    onChange={() => setClassType("Economy")}
                  />
                  <label
                    htmlFor="Economy"
                    className={`${
                      classType === "Economy" ? "text-black" : "text-gray-400"
                    } text-xs font-semibold pl-1 select-none cursor-pointer `}
                  >
                    Economy
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="Business"
                    type="radio"
                    value="Business"
                    checked={classType === "Business"}
                    onChange={() => setClassType("Business")}
                  />
                  <label
                    htmlFor="Business"
                    className={`${
                      classType === "Business" ? "text-black" : "text-gray-400"
                    } text-xs font-semibold pl-1 select-none cursor-pointer`}
                  >
                    Business
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="First"
                    type="radio"
                    value="First"
                    checked={classType === "First"}
                    onChange={() => setClassType("First")}
                  />
                  <label
                    htmlFor="First"
                    className={`${
                      classType === "First" ? "text-black" : "text-gray-400"
                    } text-xs font-semibold pl-1 select-none cursor-pointer`}
                  >
                    First
                  </label>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="text-sm bg-blue-500 hover:bg-transparent hover:text-blue-500 border border-blue-500 text-white px-6 py-1 rounded-md shadow-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Passengers;
