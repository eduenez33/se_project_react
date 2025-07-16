import ItemCard from "../ItemCard/ItemCard";

import ClothingItemsContext from "../../contexts/ClothingItemsContext";

import "./ClothesSection.css";
import { useContext } from "react";

function ClothesSection() {
  const { clothingItems, handleCardClick } = useContext(ClothingItemsContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__top">
        <p className="clothes-section__text">Your items</p>
        <button className="clothes-section__add-new-btn">+ Add new</button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
