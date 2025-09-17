import ItemCard from "../ItemCard/ItemCard";

import ClothingItemsContext from "../../contexts/ClothingItemsContext";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import "./ClothesSection.css";
import { useContext } from "react";

function ClothesSection({ onAddItem }) {
  const { clothingItems, handleCardClick, handleCardLike } =
    useContext(ClothingItemsContext);
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__top">
        <p className="clothes-section__text">Your items</p>
        <button className="clothes-section__add-new-btn" onClick={onAddItem}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
