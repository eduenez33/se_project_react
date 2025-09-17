import { useContext } from "react";

import "../ModalWithForm/ModalWithForm.css";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ItemModal({ activeModal, card, handleModalClose, onItemDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleModalClose}
          type="button"
          className="modal__close modal__close_type_preview"
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__bottom">
          <div className="modal__text-content">
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              onClick={() => {
                onItemDelete(card);
              }}
              className="modal__button"
              type="button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
