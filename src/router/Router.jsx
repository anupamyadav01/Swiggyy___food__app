import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import { RxCross2 } from "react-icons/rx";
import Cart from "../pages/Cart/Cart";
import Support from "../pages/Support/Support";
import RestaurantDetail from "../pages/RestaurantDetail/RestaurantDetail";
import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import {
  LatitudeAndLogitudeContext,
  AddressContext
} from "../context/SwiggyContext";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../utils/store";
import MainPage from "../pages";
import { toggleSearchLocation } from "../utils/slices/toggleSlice";

const Router = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState("");
  const [cordinates, setCordinates] = useState({
    lat: "26.95250",
    lng: "75.71050"
  });
  const showLocation = useSelector(
    (state) => state.toggleSlice.showLocationToggle
  );
  useEffect(() => {
    const handleLocationFunc = async () => {
      const response = await fetch(
        `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${query}`
      );
      const data = await response.json();
      setSearchData(data.data);
      // console.log(data.data);
    };
    handleLocationFunc();
  }, [query]);

  const getLatitudeAndLongitude = async (placeID) => {
    if (!placeID) return;
    const res = await fetch(
      `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeID}`
    );
    const data = await res.json();
    setCordinates({
      lat: data?.data[0]?.geometry?.location?.lat,
      lng: data?.data[0]?.geometry?.location?.lng
    });
    setAddress(data?.data[0]?.formatted_address);
    // console.log(placeID);
    dispatch(toggleSearchLocation());
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <LatitudeAndLogitudeContext.Provider
          value={{ cordinates, setCordinates }}
        >
          <AddressContext.Provider value={{ address, setAddress }}>
            <div
              className={
                showLocation
                  ? "max-h-screen overflow-hidden"
                  : "relative w-full"
              }
            >
              <div className="w-full">
                {showLocation && (
                  <div className="absolute z-30 h-full w-full bg-black/35"></div>
                )}

                <div
                  style={{ transform: showLocation && "translateX(0)" }}
                  className="absolute left-0 z-50 h-screen w-[500px] -translate-x-[500px] border border-black bg-white duration-500"
                >
                  <div className="h-full w-full border border-black px-14 py-6">
                    <div className="flex flex-col gap-5">
                      <div>
                        <RxCross2
                          className="cursor-pointer text-2xl"
                          onClick={() => dispatch(toggleSearchLocation())}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Search for area, street name.."
                          className="w-full border-2 border-gray-200 p-3 font-semibold outline-none focus:shadow-lg"
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                      <div className="px-7">
                        {searchData ? (
                          searchData.map((item) => {
                            return (
                              <div
                                onClick={() =>
                                  getLatitudeAndLongitude(item.place_id)
                                }
                                className="cursor-pointer border-b border-gray-200 p-2"
                                key={item.structured_formatting.main_text}
                              >
                                <p className="text-base font-semibold text-gray-800 hover:text-orange-600">
                                  {item.structured_formatting.main_text}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {item.structured_formatting.secondary_text}
                                </p>
                              </div>
                            );
                          })
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <p className="text-2xl font-semibold">
                              No result found
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Navbar />
              <Routes>
                <Route path="/" element={<MainPage />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/support" element={<Support />} />
                  <Route
                    path="/restaurant/:id"
                    element={<RestaurantDetail />}
                  />
                </Route>
              </Routes>
              {/* <Footer /> */}
            </div>
          </AddressContext.Provider>
        </LatitudeAndLogitudeContext.Provider>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
