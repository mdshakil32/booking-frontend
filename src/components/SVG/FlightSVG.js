import { useRouter } from "next/router";
import React from "react";

const Flight = () => {
  const router = useRouter();
  return (
    <div>
      <svg
        className={`${
          router.query.search !== "hotel"
            ? " stroke-blue-600"
            : "stroke-gray-600"
        }  group-hover:stroke-blue-600 duration-200 `}
        width="25px"
        height="25px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5 4.5C17.3284 3.67157 18.6716 3.67157 19.5 4.5V4.5C20.3284 5.32843 20.3284 6.67157 19.5 7.5L17 10L18.8633 17.4361C18.9482 17.7749 18.8501 18.1335 18.6046 18.382L18.3626 18.6269C17.9174 19.0776 17.1706 19.0059 16.8192 18.4788L13.5 13.5L9.5 17.5V19.5858C9.5 19.851 9.39464 20.1054 9.20711 20.2929L8.92578 20.5742C8.45953 21.0405 7.67757 20.9357 7.35043 20.3633L6 18L3.63675 16.6496C3.06425 16.3224 2.95953 15.5405 3.42578 15.0742L3.70711 14.7929C3.89464 14.6054 4.149 14.5 4.41421 14.5H6.5L10.5 10.5L5.52125 7.18083C4.99413 6.82942 4.92247 6.08263 5.37316 5.63739L5.61816 5.39535C5.86664 5.14987 6.2252 5.05183 6.56401 5.13673L14 7L16.5 4.5Z"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default Flight;
