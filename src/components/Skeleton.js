import React from "react";

const Skeleton = () => {
  const skelteonItems = [1, 2, 3, 4, 5];
  return (
    <div className="max-w-[1000px] mx-auto">
      {skelteonItems.map((item) => (
        <div key={item} className="h-[200px] skeleton rounded-xl p-2 mt-3">
          <div className="h-full bg-white rounded-xl p-5">
            <div className="h-full skeleton-inner rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
