import PropTypes from "prop-types";
import DetailMenuCard from "./DetailMenuCard";
const DetailMenuContainer = ({ itemCards, restaurantInfo }) => {
  // console.log(itemCards);
  return (
    <div className="my-4">
      {itemCards.map(({ card: { info } }) => {
        return (
          <DetailMenuCard
            key={info.name}
            info={info}
            restaurantInfo={restaurantInfo}
          />
        );
      })}
    </div>
  );
};
DetailMenuContainer.propTypes = {
  itemCards: PropTypes.array,
  restaurantInfo: PropTypes.object
};

export default DetailMenuContainer;
