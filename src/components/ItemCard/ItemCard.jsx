import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeButton from "../../assets/like-button.png";
import likeButtonLiked from "../../assets/like-button__liked.png";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  if (!item) {
    return null;
  }

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked =
    currentUser && item.likes && Array.isArray(item.likes)
      ? item.likes.some((id) => id === currentUser?._id)
      : false;

  const handleLike = () => {
    if (currentUser && item._id) {
      onCardLike({ id: item._id, isLiked });
    }
  };

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
      {currentUser && (
        <button
          className="card__like-button"
          onClick={handleLike}
          type="button"
        >
          <img
            src={isLiked ? likeButtonLiked : likeButton}
            alt="Like"
            className="card__like-icon"
          />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
