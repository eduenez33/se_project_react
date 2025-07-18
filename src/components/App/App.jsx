import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getItems, addItem, deleteItem } from "../../utils/api.js";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import ClothingItemsContext from "../../contexts/ClothingItemsContext.js";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
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

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather }).then(({ name, imageUrl, weather }) => {
      setClothingItems((prev) => [{ name, imageUrl, weather }, ...prev]);
    });

    handleModalClose();
  };

  const handleItemDelete = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== card._id)
        );

        handleModalClose();
      })
      .catch(console.error);
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

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <ClothingItemsContext.Provider value={{ clothingItems, handleCardClick }}>
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={<Profile onAddItem={handleAddClick} />}
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            handleModalClose={handleModalClose}
            activeModal={activeModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={activeCard}
            handleModalClose={handleModalClose}
            onItemDelete={handleItemDelete}
          />
        </div>
      </ClothingItemsContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
