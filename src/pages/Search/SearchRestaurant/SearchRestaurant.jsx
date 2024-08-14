import PropTypes from "prop-types";
import SearchRestaurantCard from "./RestaurantSearchCard";

const SearchRestaurant = ({ restaurantData }) => {
  return (
    <div>
      {" "}
      <div className="mx-auto grid w-[85%] grid-cols-2 gap-6 bg-[#eee] px-4 py-8">
        {restaurantData.map((item, index) => (
          <SearchRestaurantCard key={index} restaurant={item} />
        ))}
      </div>
    </div>
  );
};

SearchRestaurant.propTypes = {
  restaurantData: PropTypes.array
};

export default SearchRestaurant;
