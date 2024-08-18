import { useContext, useEffect, useState } from "react";
import { getFoodTypesData } from "../../../apis/index";
import { LatitudeAndLogitudeContext } from "../../../context/SwiggyContext";
const FoodTypes = () => {
  const {
    cordinates: { lat, lng }
  } = useContext(LatitudeAndLogitudeContext);
  const [loading, setLoading] = useState(false);
  // getting data from API
  const [food, setFood] = useState([]);
  useEffect(() => {
    setLoading(true);
    getFoodTypesData(lat, lng)
      .then((data) => {
        setFood(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [lat, lng]);
  const [value, setValue] = useState(0);
  // base URL for images
  const baseURL = "https://media-assets.swiggy.com/swiggy/image/upload";

  const handleNext = () => {
    if (value >= 155) return;
    setValue((prev) => prev + 31);
  };

  const handlePrev = () => {
    if (value === 0) return;
    setValue((prev) => prev - 31);
  };

  return (
    <>
      {loading ? (
        <div className="flex w-full flex-wrap gap-8">
          {Array(10)
            .fill(0)
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className="animate h-[182px] w-[295px] rounded-md"
                ></div>
              );
            })}
        </div>
      ) : (
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
              {food &&
                food.map((item) => {
                  return (
                    <img
                      key={item.id}
                      className="w-36 object-cover"
                      src={`${baseURL}/${item.imageId}`}
                      alt=""
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodTypes;
