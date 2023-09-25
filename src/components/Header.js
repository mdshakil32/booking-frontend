import React from "react";

import localFont from "@next/font/local";
const doubleBubble = localFont({ src: "../../fonts/Double_Bubble.otf" });

const Header = () => {
  return (
    <div className="">
      <div className="bg-gray-200 p-3">
        <h1 style={doubleBubble.style} className="text-4xl">
          NextTravel
        </h1>
      </div>
    </div>
  );
};

export default Header;
