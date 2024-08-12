import { useState } from "react";
import RestaurentCard from "../RestaurentCard/RestaurentCard";
import PropTypes from "prop-types";
import { v4 as generateId } from "uuid";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setFilterData } from "../../utils/slices/filterSlice";

const Restaurents = ({ restaurantData, title }) => {
  // console.log(restaurantData);
  const dispatch = useDispatch();
  // const filterBtnValue = useSelector(
  //   (state) => state.filterSlice.filterBtnName
  // );
  // console.log(filterBtnValue);

  const [activeBtn, setActiveBtn] = useState(null);

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
    <div>
      <div>
        <p className="text-2xl font-bold">{title}</p>
        <div className="mb-10 mt-5 flex gap-3">
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
              <span className="text-sm font-medium">{item.title}</span>
              {activeBtn === item.title && <IoCloseOutline size={20} />}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center gap-7">
        {restaurantData &&
          restaurantData.map((item) => {
            return <RestaurentCard key={item.info.id} item={item} />;
          })}
      </div>
    </div>
  );
};

Restaurents.propTypes = {
  restaurantData: PropTypes.array,
  title: PropTypes.string
};

export default Restaurents;
