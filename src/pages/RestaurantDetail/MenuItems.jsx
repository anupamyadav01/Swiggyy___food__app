/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState } from "react";
import DetailMenuContainer from "./DetailMenuContainer";

const MenuItems = ({ card, restaurantInfo }) => {
  let opened = false;
  if (card["@type"]) {
    opened = true;
  }
  const [isOpen, setIsOpen] = useState(opened);

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };
  if (card.itemCards) {
    const { title, itemCards } = card;
    return (
      <>
        <div>
          <div>
            <div className={"flex items-center justify-between"}>
              <h1
                className={
                  "text-" + (card["@type"] ? "lg font-bold" : "base font-bold")
                }
              >
                {title} ({itemCards.length})
              </h1>
              <span onClick={toggleDropDown}>
                {isOpen ? (
                  <i className="fi fi-ss-angle-small-up cursor-pointer text-3xl"></i>
                ) : (
                  <i className="fi fi-ss-angle-small-down cursor-pointer text-3xl"></i>
                )}
              </span>
            </div>
          </div>
          {isOpen && (
            <DetailMenuContainer
              itemCards={itemCards}
              restaurantInfo={restaurantInfo}
            />
          )}
        </div>

        <hr className="mt-5 h-3" />
      </>
    );
  } else {
    const { title, categories } = card;
    // console.log(categories);

    return (
      <div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">{title}</div>
        </div>
        <div>
          {categories.map((data) => {
            return <MenuItems key={data.title} card={data} />;
          })}
        </div>
      </div>
    );
  }
};

MenuItems.propTypes = {
  card: PropTypes.object
};

export default MenuItems;
