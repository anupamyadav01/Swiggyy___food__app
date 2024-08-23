import { useState } from "react";
import RestaurentCard from "../AllRestaurants/RestaurentCard";
import PropTypes from "prop-types";
import { v4 as generateId } from "uuid";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setFilterData } from "../../../utils/slices/filterSlice";
import NoImgFound from "../../../assets/data.png";

const AllRestaurants = ({ restaurantData, title }) => {
  console.log(title);

  //   console.log(restaurantData);
  const dispatch = useDispatch();
  const [activeBtn, setActiveBtn] = useState(null);

  // if (restaurantData.length === 0) {
  //   return <div>No Data</div>;
  // }

  const filterButtons = [
    { id: generateId(), title: "Clear All Filters" },
    { id: generateId(), title: "Ratings 4.0+" },
    { id: generateId(), title: "New on Swiggy" },
    { id: generateId(), title: "Fast Delivery" },
    { id: generateId(), title: "Offers" },
    { id: generateId(), title: "Rs. 300-Rs. 600" },
    { id: generateId(), title: "Less than Rs. 300" }
  ];
  const handleActiveBtn = (btnName) => {
    if (btnName === "Clear All Filters") return;
    setActiveBtn(activeBtn === btnName ? null : btnName);
  };
  dispatch(setFilterData(activeBtn));

  return (
    <div className="px-5 sm:p-0">
      <div>
        <p className="text-2xl font-bold">
          All restaurants in {title?.split(" ").at(-1)}
        </p>
        <div className="mb-10 mt-5 flex flex-wrap gap-3">
          {filterButtons.map((item) => (
            <div
              key={item.title}
              onClick={() => handleActiveBtn(item.title)}
              style={
                activeBtn === item.title
                  ? { backgroundColor: "#eee", border: "1px solid black" }
                  : null
              }
              className="flex cursor-pointer items-center gap-2 rounded-[18px] border border-gray-300 px-4 py-2 text-gray-800"
            >
              <span className="text-xs font-medium sm:text-sm">
                {item.title}
              </span>
              {activeBtn === item.title && <IoCloseOutline size={20} />}
            </div>
          ))}
        </div>
      </div>
      {restaurantData.length === 0 ? (
        <div className="mx-auto flex w-[85%] items-center justify-center gap-2 py-6">
          <img className="-mt-20 w-[50%]" src={NoImgFound} alt="" />
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 sm:p-0 md:grid-cols-3 lg:grid-cols-4">
          {restaurantData &&
            restaurantData.map((item) => {
              return <RestaurentCard key={item.info.id} item={item} />;
            })}
        </div>
      )}
    </div>
  );
};

AllRestaurants.propTypes = {
  restaurantData: PropTypes.array,
  title: PropTypes.string
};

export default AllRestaurants;
