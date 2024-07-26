import FoodTypes from "../../components/FoodTypes/FoodTypes";
import TopRestaurent from "../../components/TopRestaurent/TopRestaurent";

const Home = () => {
  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-[75%] flex-col items-center justify-between py-3">
        {/* food types carousel */}
        <FoodTypes />
        {/* horizontal line */}
        <div className="w-full">
          <hr className="mb-8 mt-10" />
        </div>

        {/* Top Restaurant Carousel */}
        <TopRestaurent />
      </div>
    </div>
  );
};

export default Home;
