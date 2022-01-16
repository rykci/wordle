import React from "react";

export default function Box({ status, value, fill, keyboard }) {
  const statusLookup = {
    correct: "border-green-500 bg-green-500 text-white",
    semi: "border-yellow-500 bg-yellow-500 text-white",
    wrong: "border-gray-500 bg-gray-500 text-white",
    blank: "border-gray-300",
    black: "border-black",
  };

  return (
    <div
      className={`border-2 ${keyboard ? "w-7 h-9" : "w-20 h-20"}  text-center ${
        statusLookup[status]
      }`}
    >
      <div
        className={`flex h-full items-center justify-center ${
          keyboard ? "text-lg" : "text-5xl"
        } font-semibold font-sans `}
      >
        {value}
      </div>
    </div>
  );
}
