/* eslint-disable react/prop-types */

import RestaurantCard from "./RestaurantCard";

const Dishes = ({ dishesData }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-10 bg-gray-100 px-4 py-3">
      {dishesData.map((item, index) => (
        <RestaurantCard key={index} data={item} />
      ))}
    </div>
  );
};

export default Dishes;
