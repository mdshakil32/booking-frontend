"use client";

import React, { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  dateWithTime,
  getFullDate,
  getOnlyDay,
} from "../../utils/momentFormatter";
import { allAirportList } from "../../utils/flightData";
import SearchSVG from "./SVG/SearchSVG";

import Skeleton from "./Skeleton";
import HotelPassengers from "./HotelPassengers";
import HotelCities from "./HotelCities";
import { toast } from "react-toastify";
import Image from "next/image";
import AirSVG from "./SVG/AirSVG";
import Star from "./SVG/Star";
import RightArrowSVG from "./SVG/RightArrowSVG";

const Hotels = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getNextDay = () => {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    return nextDay;
  };

  const [selectedCity, setSelectedCity] = useState(null);

  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(getNextDay());

  // passenger and class
  const [adults, setAdults] = useState(1);
  const [childs, setChilds] = useState(0);
  const [rooms, setRooms] = useState(1);

  const [results, setResults] = useState([]);
  const [totalItems, setTotalItems] = useState(1);

  const [currency, setCurrency] = useState("USD");

  function checkDateValidity() {
    const checkOutDate = new Date(checkOut);
    const checkInDate = new Date(checkIn);

    // Compare the two dates
    return checkInDate < checkOutDate;
  }

  const handleSearch = async (selectedPage) => {
    console.log("----", checkDateValidity());

    if (selectedCity !== null && checkDateValidity()) {
      setIsLoading(true);
      const apiRoute = `https://booking-n129.onrender.com/hotel?page=${selectedPage}&limit=10&currency=${currency}&location=${selectedCity.code}&checkIn=${checkIn}&checkOut=${checkOut}&childs=${childs}&adults=${adults}&rooms=${rooms}`;
      const req = await fetch(apiRoute);
      const newData = await req.json();
      setIsLoading(false);
      setResults(newData.data);
      setTotalItems(newData.count);
      console.log("new Data", newData);
    } else if (selectedCity === null) {
      toast.warn("Please Select A Location First");
    } else {
      toast.warn("CheckOut Must Be After CheckIn");
    }
  };

  const getLocation = (code) => {
    const foundAirline = allAirportList.find((item) => item.code === code);

    if (foundAirline) {
      return `${foundAirline.city}, ${foundAirline.country}`;
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const offset = 10;
  // const totalPages = Math.ceil(allMarketData.length / offset);
  const totalPages = Math.ceil(totalItems / offset);

  const visiblePages = 3;

  // Calculate range of visible page numbers
  const rangeStart = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  const rangeEnd = Math.min(rangeStart + visiblePages - 1, totalPages);

  // Generate page numbers to display
  const pages = [];
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  const handlePageClick = (page) => {
    setCurrentPage(page);
    handleSearch(page);
  };

  return (
    <div className="container ">
      <div className="lg:flex items-center justify-center gap-4 pt-5 ">
        {/* ======= location ==== */}
        <div className="mb-4 lg:mb-0">
          <HotelCities setSelectedCity={setSelectedCity} />
        </div>

        {/* ====== date and count ====== */}
        <div className="sm:flex items-center justify-center gap-4">
          <div className="xs:flex items-center justify-center gap-1">
            <div className="border rounded-xl p-2.5 relative w-full min-h-[78px] mb-4 xs:mb-0">
              <p className="text-xs">Check In</p>

              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                minDate={new Date()}
                dateFormat="MMM d, yyyy"
                className="cursor-pointer"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />

              <p className="text-xs">{getOnlyDay(checkIn)} </p>
            </div>

            <div className="border rounded-xl p-2.5 relative w-full min-h-[78px] ">
              <p className="text-xs">Check Out</p>

              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                minDate={getNextDay()}
                dateFormat="MMM d, yyyy"
                className="cursor-pointer"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />

              <p className="text-xs">{getOnlyDay(checkOut)} </p>
            </div>
          </div>
          <div className="sm:mt-0 mt-4 ">
            <HotelPassengers
              setAdults={setAdults}
              adults={adults}
              childs={childs}
              setChilds={setChilds}
              rooms={rooms}
              setRooms={setRooms}
            />
          </div>
        </div>
      </div>
      <div className="pt-6 text-center">
        <button
          onClick={() => handleSearch(1)}
          className="bg-blue-500 hover:bg-transparent hover:text-blue-500 border border-blue-500 text-white px-6 py-2 rounded-md shadow-lg"
        >
          Search
        </button>
      </div>

      {/* ======== flights list ========= */}
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="pt-10">
          {results.map((hotel, index) => (
            <div key={index} className=" ">
              <div className="max-w-[1000px]  mx-auto border p-5 rounded-md mb-5 shadow-lg">
                <div className="grid grid-cols-12 items-center gap-5 ">
                  {/* ====== left item ====== */}
                  <div className="col-span-9 flex items-center gap-4 ">
                    <div className=" relative w-[150px]">
                      <Image
                        src={"/hotel.png"}
                        height={130}
                        width={130}
                        alt="hotel"
                      />
                    </div>

                    <div className=" flex items-center gap-6 ">
                      <div>
                        <p className="text-lg font-medium">{hotel.name}</p>

                        <div className="flex items-center gap-3">
                          <div className="border  rounded w-[70px] flex items-center justify-center gap-1">
                            <Star />
                            <p className="text-xs font-semibold">
                              {hotel.starCount} Star
                            </p>
                          </div>

                          <div className="font-bold text-xs text-gray-600 flex items-center gap-1 py-3">
                            <img src="/location.png" className="w-4" />
                            {getLocation(hotel.location)}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {hotel.AC && (
                            <div className="font-bold text-xs text-gray-600 flex items-center gap-1 py-2">
                              <AirSVG /> Air Condition
                            </div>
                          )}

                          {hotel.breakfast && (
                            <div className="font-bold text-xs text-gray-600 flex items-center gap-1 py-2">
                              <img
                                src="/breakfast.png"
                                alt="breakfast"
                                className="w-5"
                              />
                              Breakfast Includes
                            </div>
                          )}
                        </div>

                        <div className="py-3 flex items-center gap-3">
                          <p className="text-gray-600 py-0.5 text-xs font-semibold border  rounded w-14 text-center bg-blue-200 border-blue-500">
                            {hotel.rating}/5
                          </p>
                          <p className="w-fit select-none text-xs text-orange-600 border font-medium text-center border-orange-600 rounded-full px-3 py-1.5">
                            {hotel.available} Room Remaining
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ======= right item ======= */}
                  <div className="col-span-3">
                    <div className="">
                      <div className="flex justify-end">
                        <p className="select-none text-xs text-white font-medium text-center w-16 bg-orange-600 rounded-full py-1">
                          {hotel.discount} Off
                        </p>
                      </div>

                      <div className="text-end py-4">
                        <p className="text-lg font-bold">
                          {hotel.price} {hotel.currency}
                        </p>
                        <p className="text-xs ">For 1 night, Per room</p>
                      </div>

                      <div className="flex justify-end">
                        <p className=" select-none text-xs text-white font-medium text-center w-20 bg-green-500 rounded-full py-1">
                          {hotel.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========= pagination ==========  */}
      {results.length > 0 && (
        <div className="max-w-[1000px]  mx-auto pagination flex items-center justify-center">
          <div className="flex items-center gap-2 my-3">
            <ul className="pagination flex items-center gap-2">
              <li
                className="rounded-lg w-10 h-10 flex items-center justify-center hover:bg-[#D5E6FB] dark:hover:bg-[#062141]  cursor-pointer"
                onClick={() =>
                  currentPage > 1 && handlePageClick(currentPage - 1)
                }
              >
                <div className="rotate-180">
                  <RightArrowSVG />
                </div>
              </li>
              {/*  before dots  */}
              {rangeStart >= 2 && (
                <>
                  <li
                    className="select-none rounded-lg w-10 h-10 flex items-center justify-center disabled cursor-pointer hover:bg-[#D5E6FB] dark:hover:bg-[#062141] "
                    onClick={() => handlePageClick(1)}
                  >
                    1
                  </li>
                  {currentPage > 4 && (
                    <li className="rounded-lg w-10 h-10 flex items-center justify-center select-none disabled">
                      ...
                    </li>
                  )}
                </>
              )}
              {/* Generate page buttons */}
              {pages.map((page) => (
                <li
                  key={page}
                  className={`select-none rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#D5E6FB] dark:hover:bg-[#062141]  ${
                    page === currentPage
                      ? " bg-[#D5E6FB] dark:bg-[#062141] text-[#0060FF] "
                      : "bg-transparent"
                  }`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </li>
              ))}
              {/* after dots  */}
              {rangeEnd < totalPages && (
                <>
                  {totalPages - currentPage > 3 && (
                    <li className="rounded-lg w-10 h-10 flex items-center justify-center  disabled select-none">
                      ...
                    </li>
                  )}
                  <li
                    className="select-none rounded-lg w-10 h-10 flex items-center justify-center  cursor-pointer hover:bg-[#D5E6FB] dark:hover:bg-[#062141]"
                    onClick={() => handlePageClick(totalPages)}
                  >
                    {totalPages}
                  </li>
                </>
              )}

              <li
                className="select-none cursor-pointer rounded-lg w-10 h-10 flex items-center justify-center hover:bg-[#D5E6FB] dark:hover:bg-[#062141]"
                onClick={() =>
                  currentPage < totalPages && handlePageClick(currentPage + 1)
                }
              >
                <RightArrowSVG />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
