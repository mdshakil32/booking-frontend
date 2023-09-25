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
import DepartureAirport from "./DepartureAirport";
import ArrivalAirport from "./ArrivalAirport";
import Passengers from "./Passengers";
import Skeleton from "./Skeleton";
import RightArrowSVG from "./SVG/RightArrowSVG";
import { toast } from "react-toastify";

const Flights = () => {
  const getNextDay = () => {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    return nextDay;
  };

  const [tripWay, setTripWay] = useState("onewaytrip");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);

  const [journeyDate, setJourneyDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(getNextDay());

  // passenger and class
  const [adults, setAdults] = useState(1);
  const [childs, setChilds] = useState(0);
  const [classType, setClassType] = useState("Economy");
  const [currency, setCurrency] = useState("USD");

  const [results, setResults] = useState([]);
  const [totalItems, setTotalItems] = useState(1);

  const handleSearch = async (selectedPage) => {
    if (selectedArrival !== null && selectedDeparture !== null) {
      setIsLoading(true);
      const apiRoute = `https://booking-n129.onrender.com/flights?page=${selectedPage}&limit=10&currency=${currency}&departureCity=${selectedDeparture.code}&arrivalCity=${selectedArrival.code}&journeyDate=${journeyDate}&returnDate=${returnDate}&childs=${childs}&adults=${adults}&classType=${classType}&tripWay=${tripWay}`;
      const req = await fetch(apiRoute);
      const newData = await req.json();
      setIsLoading(false);
      setResults(newData.data);
      setTotalItems(newData.count);
      console.log("--new Data", newData);
    } else if (selectedArrival === null) {
      toast.warn("Please Select Arrival Location");
    } else {
      toast.warn("Please Select Departure Location");
    }
  };

  const getAirportName = (code) => {
    const foundAirline = allAirportList.find((item) => item.code === code);

    if (foundAirline) {
      return `${foundAirline.name}, ${foundAirline.country}`;
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
    <div className="container">
      <div className="flex items-center justify-center gap-5 pt-10 ">
        <div>
          <input
            id="onewaytrip"
            type="radio"
            value="onewaytrip"
            checked={tripWay === "onewaytrip"}
            onChange={() => setTripWay("onewaytrip")}
          />
          <label
            htmlFor="onewaytrip"
            className={`${
              tripWay === "onewaytrip" ? "text-black" : "text-gray-400"
            } font-semibold pl-1 select-none cursor-pointer`}
          >
            One Way
          </label>
        </div>
        <div>
          <input
            id="roundtrip"
            type="radio"
            value="roundtrip"
            checked={tripWay === "roundtrip"}
            onChange={() => setTripWay("roundtrip")}
          />
          <label
            htmlFor="roundtrip"
            className={`${
              tripWay === "roundtrip" ? "text-black" : "text-gray-500"
            } font-semibold pl-1 select-none cursor-pointer`}
          >
            Round Way
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center justify-center gap-4 pt-5 flex-wrap">
        {/* ====== locations ===== */}
        <div className="xl:col-span-1 col-span-2 grid sm:grid-cols-2 grid-cols-1 items-center justify-center gap-4">
          <DepartureAirport setSelectedDeparture={setSelectedDeparture} />
          <ArrivalAirport setSelectedArrival={setSelectedArrival} />
        </div>

        {/* ===== date and counts ====== */}
        <div className="xl:col-span-1 col-span-2 sm:flex items-center justify-center  gap-2">
          <div className="grid xs:grid-cols-2 grid-cols-1 xs:gap-1 gap-4">
            <div className="border rounded-xl p-2.5 relative  w-full">
              <p className="text-xs">Journey Date</p>

              <DatePicker
                selected={journeyDate}
                onChange={(date) => setJourneyDate(date)}
                minDate={new Date()}
                dateFormat="MMM d, yyyy"
                className="cursor-pointer"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />

              <p className="text-xs">{getOnlyDay(journeyDate)} </p>
            </div>

            <div className="border rounded-xl p-2.5 relative  w-full ">
              <p className="text-xs">Return Date</p>

              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                minDate={new Date()}
                dateFormat="MMM d, yyyy"
                className="cursor-pointer"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />

              <p className="text-xs">{getOnlyDay(returnDate)} </p>
              {tripWay === "onewaytrip" && (
                <div className="h-full w-full bg-[#dedede95] absolute top-0 left-0 rounded-xl"></div>
              )}
            </div>
          </div>
          <div className="sm:mt-0 mt-4 ">
            <Passengers
              setAdults={setAdults}
              adults={adults}
              childs={childs}
              setChilds={setChilds}
              setClassType={setClassType}
              classType={classType}
            />
          </div>
        </div>
      </div>
      <div className="pt-6 text-center">
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-transparent hover:text-blue-500 border border-blue-500 text-white px-6 py-2 rounded-md shadow-lg"
        >
          Search
        </button>
      </div>

      {/* ======== flights list ========= */}
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="pt-5">
          {results.map((trip, index) => (
            <div key={index} className="">
              <div className="max-w-[1000px] mx-auto border rounded-md  mb-5 shadow-lg">
                <div className="grid grid-cols-12 items-center gap-5">
                  {/* ======== destination details ======= */}
                  <div className="sm:col-span-9 col-span-12  p-5 sm:flex items-center gap-4 h-full">
                    {/* ==== airline name &image ===== */}
                    <div className="w-[160px]">
                      <img src="/biman.png" alt="biman" className="w-[150px]" />
                      <h1 className=" font-bold text-green-700">
                        {trip.airline}
                      </h1>
                    </div>

                    <div className="mt-4 sm:mt-0">
                      <div className=" lg:flex items-center gap-6">
                        {/* ====== departure ====== */}
                        <div>
                          <p className="text-xs font-medium">
                            {dateWithTime(trip.journeyDate)}
                          </p>
                          <p className="font-bold py-2.5">
                            {trip.departureCity}
                          </p>
                          <p className="text-xs">
                            {getAirportName(trip.departureCity)}
                          </p>
                        </div>

                        {/* ===== duration and stop count ====== */}
                        <div className="border-y my-3 py-3 lg:hidden block ">
                          <p className=" text-xs font-medium ">
                            {trip.stopage} - {trip.duration}H
                          </p>
                        </div>

                        <div className="lg:block hidden">
                          <div className="">
                            <p className="text-xs font-medium text-center">
                              {trip.stopage}
                            </p>
                            <div className="py-2">
                              <hr className=" " />
                            </div>
                            <p className="text-xs font-medium text-center">
                              {trip.duration}H
                            </p>
                          </div>
                        </div>

                        {/* ====== arrival ======== */}
                        <div>
                          <p className="text-xs font-medium">
                            {dateWithTime(trip.returnDate)}
                          </p>
                          <p className=" font-bold py-2.5">
                            {trip.arrivalCity}
                          </p>
                          <p className="text-xs">
                            {getAirportName(trip.arrivalCity)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4  pt-4">
                        <p className="capitalize text-xs font-semibold">
                          Adult: {trip.adults}
                        </p>
                        <p className="capitalize text-xs font-semibold">
                          children: {trip.childs}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* ======= price ======= */}
                  <div className="sm:col-span-3 col-span-12 bg-blue-50 p-5 h-full flex items-center">
                    <div className="w-full">
                      <p className="text-lg font-bold text-blue-900 sm:text-end">
                        {trip.price}{" "}
                        <span className="text-sm">{trip.currency}</span>
                      </p>

                      <p className="capitalize text-sm font-semibold sm:text-end py-1">
                        {trip.classType}
                      </p>
                      <p className="capitalize text-sm font-semibold sm:text-end py-1">
                        {trip.tripWay == "onewaytrip" ? "One Way" : "Round Way"}
                      </p>

                      <button className="group text-blue-800 font-semibold mt-2 bg-yellow-400 py-1 w-full rounded-md">
                        <span className="group-hover:pl-2 duration-200">
                          Select &rarr;
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ===== bottom section ===== */}
                <div className="col-span-12 h-10 border-t flex items-center justify-between px-5">
                  <div className="flex items-center gap-2 select-none cursor-pointer">
                    <p className="text-xs font-medium text-gray-600">
                      {trip.refund}
                    </p>

                    <p className="rotate-90 text-lg ">&#8250;</p>
                  </div>
                  <div className="flex items-center gap-2 select-none cursor-pointer">
                    <p className="text-xs font-medium text-gray-600">
                      {" "}
                      View Details
                    </p>

                    <p className="rotate-90 text-lg text-gray-600">&#8250;</p>
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

export default Flights;
