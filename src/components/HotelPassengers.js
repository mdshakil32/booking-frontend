"use client";

import React, { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

import MinusSVG from "./SVG/MinusSVG";
import PlusSVG from "./SVG/PlusSVG";

const HotelPassengers = ({
  setAdults,
  adults,
  childs,
  setChilds,
  rooms,
  setRooms,
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

  const handleRooms = (type) => {
    if (type === "plus") {
      setRooms(rooms + 1);
    } else {
      rooms > 1 && setRooms(rooms - 1);
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
        className="border rounded-xl p-2.5 relative min-h-[78px] w-full min-w-[180px] bg-white"
      >
        <div
          onClick={() => setDropdown(!dropdown)}
          className="select-none cursor-pointer "
        >
          <p className="text-xs">Rooms & Guests</p>
          <div className="flex items-center">
            <p className="font-semibold ">
              {rooms} <span className="font-thin text-xs">Room, </span>
            </p>
            <p className="font-semibold ">
              {totalPassengers} <span className="font-thin text-xs">Guest</span>
            </p>
          </div>
          <div className="flex items-center">
            <p className="font-thin text-xs">{adults} Adult</p>
            {childs > 0 && (
              <p className="font-thin text-xs">, {childs} Children</p>
            )}
          </div>
        </div>

        <div
          className={`${
            dropdown
              ? "h-[230px] overflow-y-auto border"
              : "h-0 overflow-y-hidden"
          } absolute top-20 right-0  w-[220px]  bg-white z-50 rounded-xl shadow-xl `}
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

            {/* ==== rooms ==== */}
            <div className="flex items-center justify-between space-x-3 px-3 py-2">
              <p className="text-xs font-semibold">Rooms</p>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => handleRooms("minus")}
                  className="w-7 h-7 rounded-full border flex items-center justify-center"
                >
                  <MinusSVG />
                </button>
                <h1 className="text-xs font-semibold">{rooms} </h1>
                <button
                  onClick={() => handleRooms("plus")}
                  className="w-7 h-7 rounded-full border flex items-center justify-center"
                >
                  <PlusSVG />
                </button>
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

export default HotelPassengers;
