import { useState } from "react";
import SwiggyData from "../../constants/SwiggyData.json";

// image base address
// https://media-assets.swiggy.com/swiggy/image/upload

const FoodTypes = () => {
  const [value, setValue] = useState(0);

  const baseURL = "https://media-assets.swiggy.com/swiggy/image/upload";
  const [food] = useState(
    SwiggyData?.data?.cards[0]?.card?.card?.imageGridCards?.info
  );

  const handleNext = () => {
    if (value >= 155) return;
    setValue((prev) => prev + 31);
  };
  console.log(value);

  const handlePrev = () => {
    if (value === 0) return;
    setValue((prev) => prev - 31);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-3">
        <p className="text-2xl font-bold">What&apos;s in your mind?</p>
        <div className="flex gap-3">
          <span
            onClick={handlePrev}
            style={value <= 0 ? { opacity: "0.5" } : null}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-300"
          >
            <i className="fi fi-rr-arrow-small-left mt-1 text-2xl"></i>
          </span>
          <span
            onClick={handleNext}
            style={value >= 155 ? { opacity: "0.5" } : null}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-300"
          >
            <i className="fi fi-rr-arrow-small-right mt-1 text-2xl"></i>
          </span>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex duration-1000"
          style={{ transform: `translateX(-${value}%)` }}
        >
          {food.map((item) => {
            return (
              <img
                key={item.id}
                className="w-36"
                src={`${baseURL}/${item.imageId}`}
                alt=""
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodTypes;
