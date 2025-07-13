import { useEffect, useState } from "react";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [activeCard, setActiveCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setActiveCard(card);
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          formName="add-garment"
          isOpen={activeModal === "add-garment"}
          activeModal={activeModal}
          handleModalClose={handleModalClose}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageURL" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageURL"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                className="modal__radio-input"
                name="weather_type"
                id="hot"
              />{" "}
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                className="modal__radio-input"
                name="weather_type"
                id="warm"
              />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                className="modal__radio-input"
                name="weather_type"
                id="cold"
              />{" "}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={activeCard}
          handleModalClose={handleModalClose}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
