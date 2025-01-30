import InputSearchBar from "./InputSearchBar";
import { useState } from "react";

export default function Carousel({
  imagesList,
  homepage,
  filteredProperties,
  setFilteredProperties,
  properties,
}) {
  const defaultSearchInput = {
    text: "",
  };
  const [searchInput, setSearchInput] = useState(defaultSearchInput);

  console.log(filteredProperties);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {homepage && (
          <div className="homepage-floating-title">
            <h1 className="homepage-tile">Titolo d'effetto</h1>
            <InputSearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setFilteredProperties={setFilteredProperties}
              properties={properties}
              searchpage={false}
              handleSubmit={handleSubmit}
            />
          </div>
        )}
        <div className="carousel-inner">
          {imagesList.map((image, index) => {
            return (
              <div className="carousel-item active">
                <img src={`/${image}`} className="d-block" alt={index} />
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
