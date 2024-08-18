/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { RxCross2 } from "react-icons/rx";
import { Provider, useDispatch, useSelector } from "react-redux";
import { LatitudeAndLogitudeContext } from "../context/SwiggyContext";
import store from "../utils/store";
import { toggleSearchLocation } from "../utils/slices/toggleSlice";
import { changeAddress } from "../utils/slices/addressSlice";
import Navbar from "../components/Navbar/Navbar";
import MainPage from "../pages";
// import Shimmer from "../components/Shimmer/Shimmer/Shimmer.jsx";
import Footer from "../components/Footer/Footer.jsx";
import {
  CircleSkeleton,
  RectangleSkeleton
} from "../components/Shimmer/Shimmer/Shimmer.jsx";

// Lazy loading components for code-splitting
const Home = React.lazy(() => import("../pages/Home/index.jsx"));
const SearchPage = React.lazy(() => import("../pages/Search/SearchPage"));
const Cart = React.lazy(() => import("../pages/Cart/Cart"));
const Support = React.lazy(() => import("../pages/Support/Support"));
const RestaurantDetail = React.lazy(
  () => import("../pages/RestaurantDetail/RestaurantDetail")
);

const Router = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState("");

  const [cordinates, setCordinates] = useState({
    lat: 28.6110886,
    lng: 77.2345184
  });

  const showLocation = useSelector(
    (state) => state.toggleSlice.showLocationToggle
  );

  useEffect(() => {
    const handleLocationFunc = async () => {
      if (query) {
        const response = await fetch(
          `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${query}`
        );
        const data = await response.json();
        setSearchData(data.data);
      }
    };

    const debounceTimer = setTimeout(() => {
      handleLocationFunc();
    }, 300); // Adding debounce of 300ms

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const getLatitudeAndLongitude = useCallback(
    async (placeID) => {
      if (!placeID) return;
      const res = await fetch(
        `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeID}`
      );
      const data = await res.json();
      setCordinates({
        lat: data?.data[0]?.geometry?.location?.lat,
        lng: data?.data[0]?.geometry?.location?.lng
      });
      console.log(data?.data[0]?.geometry?.location);

      dispatch(changeAddress(data?.data[0]?.formatted_address));
      dispatch(toggleSearchLocation());
      setQuery(""); // Clear query after selection
    },
    [dispatch]
  );
  const searchResults = useMemo(() => {
    return searchData.map((item) => (
      <div
        onClick={() => {
          getLatitudeAndLongitude(item.place_id);
          setTimeout(() => {
            setSearchData([]);
          }, 1000);
        }}
        className="cursor-pointer border-b border-gray-200 p-2"
        key={item.place_id}
      >
        <p className="text-sm font-semibold text-gray-800 hover:text-orange-600 sm:text-base">
          {item.structured_formatting.main_text}
        </p>
        <p className="text-xs text-gray-400 sm:text-sm">
          {item.structured_formatting.secondary_text}
        </p>
      </div>
    ));
  }, [searchData, getLatitudeAndLongitude]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <LatitudeAndLogitudeContext.Provider
          value={{ cordinates, setCordinates }}
        >
          <div
            className={
              showLocation ? "max-h-screen overflow-hidden" : "relative w-full"
            }
          >
            <div className="w-full">
              {showLocation && (
                <div className="absolute z-30 h-full w-full bg-black/35"></div>
              )}

              <div
                style={{ transform: showLocation && "translateX(0)" }}
                className="absolute left-0 z-[60] h-screen w-[300px] -translate-x-[500px] bg-white duration-500 sm:w-[500px]"
              >
                <div className="h-full w-full px-3 py-6">
                  <div className="flex flex-col gap-5 sm:mx-8">
                    <div>
                      <RxCross2
                        className="cursor-pointer text-2xl"
                        onClick={() => {
                          dispatch(toggleSearchLocation());
                          setSearchData([]);
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Search for area, street name.."
                        className="w-[90%] border-2 border-gray-200 p-3 font-semibold outline-none focus:shadow-lg sm:w-full"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                      />
                    </div>
                    <div className="px-2">{searchResults}</div>
                  </div>
                </div>
              </div>
            </div>

            <Navbar />
            <React.Suspense
              fallback={
                <div className="mx-auto w-[80%]">
                  <CircleSkeleton />
                  <RectangleSkeleton />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<MainPage />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/support" element={<Support />} />
                  <Route
                    path="/restaurant/:id"
                    element={<RestaurantDetail />}
                  />
                </Route>
              </Routes>
            </React.Suspense>
            <Footer />
          </div>
        </LatitudeAndLogitudeContext.Provider>
      </BrowserRouter>
    </Provider>
  );
};

const mainRouter = React.memo(Router);
export default mainRouter;
