import PropTypes from "prop-types";

const OffersCard = ({
  data: {
    info: { offerLogo, header, couponCode }
  }
}) => {
  return (
    <div className="flex h-[76px] min-w-[328px] gap-2 rounded-2xl border p-4">
      <img
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" +
          offerLogo
        }
        alt=""
      />
      <div>
        <h2 className="text-base font-extrabold">{header}</h2>
        <p className="text-xs font-bold text-gray-500">{couponCode}</p>
      </div>
    </div>
  );
};

OffersCard.propTypes = {
  data: PropTypes.object
};

export default OffersCard;
