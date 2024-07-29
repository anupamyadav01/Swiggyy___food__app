import FoodTypes from "../../components/FoodTypes/FoodTypes";
import Restaurents from "../../components/Restaurents/Restaurents";
import TopRestaurent from "../../components/TopRestaurent/TopRestaurent";

const Home = () => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[75%] py-3">
        {/* food types carousel */}
        <FoodTypes />
        {/* horizontal line */}
        <div className="w-full">
          <hr className="mb-8 mt-10" />
        </div>

        {/* Top Restaurant Carousel */}
        <TopRestaurent />

        {/* All restaurant section  */}
        <div className="w-full">
          <hr className="mb-9 mt-10" />
        </div>
        <div className="w-full">
          <Restaurents />
        </div>
      </div>
    </div>
  );
};

export default Home;
