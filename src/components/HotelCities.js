"use client";

import React, { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getOnlyDay } from "../../utils/momentFormatter";
import { allAirportList } from "../../utils/flightData";
import SearchSVG from "./SVG/SearchSVG";

const HotelCities = ({ setSelectedCity }) => {
  const [searchAirport, setSearchAirport] = useState("");
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const [displayAirports, setDisplayAirports] = useState([]);

  const closeDropdown = () => {
    setDropdown(false);
  };

  const handleDeparture = (airport) => {
    setSelectedCity(airport);
    setSelectedAirport(airport);
    setDropdown(false);
    setSearchAirport("");
  };

  const dropdownRef = useDetectClickOutside({
    onTriggered: closeDropdown,
  });

  useEffect(() => {
    if (searchAirport.length) {
      const filteredAirports = allAirportList.filter(
        (airport) =>
          airport.city?.toLowerCase().includes(searchAirport.toLowerCase()) ||
          airport.state?.toLowerCase().includes(searchAirport.toLowerCase()) ||
          airport.country?.toLowerCase().includes(searchAirport.toLowerCase())
      );

      setDisplayAirports(filteredAirports);
    } else {
      setDisplayAirports(allAirportList.slice(0, 10));
    }
  }, [searchAirport]);

  return (
    <div>
      <div
        key="departure-section"
        ref={dropdownRef}
        className="border rounded-xl p-2.5 relative min-h-[78px]"
      >
        <div
          onClick={() => setDropdown(!dropdown)}
          className="select-none cursor-pointer sm:min-w-[300px] w-full"
        >
          <p className="text-xs">City/Area</p>
          {selectedAirport === null ? (
            <div className="">
              <h1 className="font-semibold ">Select a city</h1>
              <p className="text-xs">Search location</p>
            </div>
          ) : (
            <div>
              <h1 className="font-semibold">{selectedAirport.city}</h1>
              <p className="text-xs">
                {selectedAirport.state} {selectedAirport.state && ","}{" "}
                {selectedAirport.country}
              </p>
            </div>
          )}
        </div>

        <div
          className={`${
            dropdown
              ? "h-[400px] overflow-y-auto border"
              : "h-0 overflow-y-hidden"
          } absolute top-20 left-0  sm:w-[300px] w-[250px]  bg-white z-50 rounded-xl shadow-xl `}
        >
          <div className="px-1 relative border-b">
            <div className="absolute left-1 top-2.5">
              <SearchSVG />
            </div>
            <input
              type="text"
              className="w-full pl-6 py-2 outline-0"
              value={searchAirport}
              onChange={(e) => setSearchAirport(e.target.value)}
            />
          </div>

          {displayAirports.map((item, index) => (
            <div
              key={index}
              onClick={() => handleDeparture(item)}
              className="p-2 hover:bg-slate-200 cursor-pointer"
            >
              <p className="font-semibold text-xs">{item.city}</p>
              <p className="text-xs">
                {item.state} {item.state && ","} {item.country}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelCities;
