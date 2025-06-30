import "./ItemModal.css";

function ItemModal({ activeModal, card, handleModalClose }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleModalClose}
          type="button"
          className="modal__close modal__close_type_preview"
        ></button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__text-content">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
