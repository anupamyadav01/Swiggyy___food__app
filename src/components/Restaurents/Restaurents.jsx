import { useContext, useEffect, useState, useCallback } from "react";
import RestaurentCard from "../RestaurentCard/RestaurentCard";
import { getTopRestaurantsData } from "../../apis";
import { LatitudeAndLogitudeContext } from "../../context/SwiggyContext";
import { v4 as generateId } from "uuid";
import { IoCloseOutline } from "react-icons/io5";
// import SwiggyData from "../../constants/SwiggyData.json";
const Restaurents = () => {
  const {
    cordinates: { lat, lng }
  } = useContext(LatitudeAndLogitudeContext);
  // const [food, setFood] = useState(
  //   SwiggyData.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
  //     ?.restaurants
  // );
  const [active, setActive] = useState(null);
  const [title, setTitle] = useState("");
  const [food, setFood] = useState([]);
  const fetchRestaurants = useCallback(async () => {
    try {
      const data = await getTopRestaurantsData(lat, lng);
      setTitle(data?.data?.cards[1]?.card?.card?.header?.title);

      setFood(
        data?.data.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      console.log(data);
    } catch (error) {
      console.error("Failed to fetch restaurant data:", error);
    }
  }, [lat, lng]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);
  // console.log(food);
  const filterButtons = [
    {
      id: generateId(),
      title: "Clear All Filters"
    },
    {
      id: generateId(),
      title: "Ratings 4.0+"
    },
    {
      id: generateId(),
      title: "Fast Delivery"
    },
    {
      id: generateId(),
      title: "Offers"
    },
    {
      id: generateId(),
      title: "Rs. 300-Rs. 600"
    },
    {
      id: generateId(),
      title: "Less than Rs. 300"
    }
  ];

  const handleActiveBtn = (btnName) => {
    // console.log(id);
    if (btnName === "Clear All Filters") return;
    setActive((prev) => (prev === btnName ? null : btnName));
  };

  return (
    <div>
      <div>
        <p className="text-2xl font-bold">{title}</p>
        <div className="mb-10 mt-5 flex gap-3">
          {filterButtons.map((item) => (
            <div
              key={item.id}
              onClick={() => handleActiveBtn(item.title)}
              style={
                active === item.title
                  ? { backgroundColor: "#eee", border: "1px solid black" }
                  : null
              }
              className="flex cursor-pointer items-center gap-2 rounded-[18px] border border-gray-300 px-4 py-2 text-gray-800"
            >
              <span className="text-sm font-medium">{item.title}</span>
              {active === item.title && <IoCloseOutline size={20} />}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center gap-7">
        {food &&
          food.map((item) => {
            return <RestaurentCard key={item.info.id} item={item} />;
          })}
      </div>
    </div>
  );
};

export default Restaurents;
