/* eslint-disable react/prop-types */
const RestaurantCard = ({ data }) => {
  const imgURL = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/`;
  // console.log(data);
  const dishes = data?.card?.card?.dishes;
  const resData = data?.card?.card?.restaurant;
  const {
    info: {
      name,
      avgRating,
      sla: { slaString }
    }
  } = resData;
  // console.log(info);

  return (
    <div className="flex w-full rounded-3xl bg-white p-4 shadow-md">
      {/* Restaurant Header */}
      <div>
        <div className="flex items-start justify-between pb-4">
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">
                <i className="fas fa-star"></i> {avgRating}
              </span>
              <span>{slaString}</span>
            </div>
          </div>
        </div>
        {/* Dishes Section */}
        <div className="grid grid-cols-2 border border-black">
          {dishes?.map((dish, index) => (
            <div
              key={index}
              className="flex w-full rounded-lg border bg-white p-4"
            >
              {/* Left Side Image with Offer */}
              <div>
                <div className="h-28 w-[28%]">
                  <img
                    src={`${imgURL}${dish.info.imageId}`}
                    alt={name}
                    className="h-full w-full rounded object-cover"
                  />
                </div>

                {/* Right Side Information */}
                <div className="flex w-[70%]">
                  <div className="ml-4 flex w-full flex-col justify-center whitespace-nowrap">
                    <h3 className="truncate text-lg font-semibold">{name}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

{
  /* <div className="flex space-x-4 overflow-x-auto">
  {dishes?.map((dish) => (
    <div
      key={dish.info.id}
      className="min-w-[200px] rounded-lg bg-gray-100 p-3 shadow-md"
    >
      <img
        className="mb-2 h-28 w-full rounded-lg object-cover"
        src={`${imgURL}${dish.info.imageId}`}
        alt={dish.info.name}
      />
      <h3 className="text-md mb-1 font-semibold">{dish.info.name}</h3>
      <p className="mb-2 text-sm text-gray-500">{dish.info.description}</p>
      <p className="mb-2 text-lg font-bold">₹{dish.info.price / 100}</p>
      <button className="w-full rounded-lg bg-green-500 py-2 font-semibold text-white">
        ADD
      </button>
    </div>
  ))}
</div>; */
}
