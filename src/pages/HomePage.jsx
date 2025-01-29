import { useState } from "react";
import { usePropertiesContext } from "../contexts/PropertiesContext";
import Card from "../components/Card";
import PropertiesTypeInputGroup from "../components/PropertiesTypeInputGroup";

export default function HomePage() {
  const { properties } = usePropertiesContext();
  const defaultSearchInput = {
    text: "",
    rooms: 0,
    beds: 0,
    bathrooms: 0,
    squareMeters: getMinFromProperties(),
    type_name: "",
  };

  const [searchInput, setSearchInput] = useState(defaultSearchInput);
  const [filteredProperties, setFilteredProperties] = useState([]);

  function handleChangeInput(e) {
    setSearchInput({ ...searchInput, [e.target.name]: e.target.value });

    setFilteredProperties(
      properties.filter((property) => {
        return (
          property.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          property.address.toLowerCase().includes(e.target.value.toLowerCase())
        );
      })
    );
  }

  function handleChangeFilters(e) {
    setSearchInput({ ...searchInput, [e.target.name]: e.target.value });
  }

  function handleSearchBar(e) {
    e.preventDefault();
    setSearchInput({ ...searchInput, text: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFilteredProperties(
      properties.filter((property) => {
        if (searchInput.type_name.length) {
          return (
            property.n_rooms >= searchInput.rooms &&
            property.n_beds >= searchInput.beds &&
            property.n_bathrooms >= searchInput.bathrooms &&
            property.square_meters >= searchInput.squareMeters &&
            property.type_name === searchInput.type_name
          );
        } else {
          return (
            property.n_rooms >= searchInput.rooms &&
            property.n_beds >= searchInput.beds &&
            property.n_bathrooms >= searchInput.bathrooms &&
            property.square_meters >= searchInput.squareMeters
          );
        }
      })
    );
    for (let i = 0; i < 3; i++) {
      e.target[i].checked = false;
    }
    e.target[3].value = getMinFromProperties();

    setSearchInput(defaultSearchInput);
  }

  function getMinFromProperties() {
    if (!properties || properties.length === 0) return 0;
    let min = properties[0].square_meters;
    properties.forEach((property, index) => {
      if (index && property.square_meters < min) min = property.square_meters;
    });
    return min;
  }

  function getMaxFromProperties() {
    if (!properties || properties.length === 0) return 0;
    let max = properties[0].square_meters;
    properties.forEach((property, index) => {
      if (index && property.square_meters > max) max = property.square_meters;
    });
    return max;
  }

  return (
    <>
      <div>
        <form onSubmit={handleSearchBar}>
          <h1 className="my-4">Cerca il tuo immobile</h1>
          <div className="row g-1">
            <div className="col-10">
              <input
                className="form-control form-control-lg"
                id="exampleDataList"
                placeholder="Cerca un nome o città..."
                name="text"
                value={searchInput.text}
                onChange={handleChangeInput}
              />
            </div>

            <div
              className="col-2 btn btn-outline-dark d-flex align-items-center justify-content-center"
              type="button flex-grow-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <h5 className="my-0">
                <i className="fa-solid fa-sliders me-1"></i>
                <span className="d-none d-md-inline">Filtri</span>
              </h5>
            </div>
          </div>
        </form>
      </div>

      <div className="row mt-5">
        {filteredProperties.map((property) => {
          return <Card key={property.id} property={property} />;
        })}
      </div>

      {/* MODAL */}
      <div className="modal fade " id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Filtri
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Tipologia Alloggio */}
                <section className="text-center p-3">
                  <h5>Tipo di alloggio</h5>
                  <PropertiesTypeInputGroup
                    handleFunction={handleChangeFilters}
                    idValue="filters-"
                  ></PropertiesTypeInputGroup>
                </section>

                <hr />
                {/* Metratura */}
                <section className="text-center p-3">
                  <div>
                    <h5>Metratura</h5>

                    {properties.length > 0 && (
                      <input
                        type="range"
                        className="form-range"
                        min={getMinFromProperties()}
                        max={getMaxFromProperties()}
                        step="1"
                        id="customRange3"
                        onChange={handleChangeFilters}
                        name="squareMeters"
                      />
                    )}
                  </div>
                  <div>
                    <span>{searchInput.squareMeters}</span>
                  </div>
                </section>

                <hr />
                {/* Stanze letti bagni */}
                <section className="text-center p-3">
                  <h5>Stanze, letti e bagni</h5>

                  <div className="d-flex justify-content-between mt-4">
                    <span>Numero stanze</span>
                    <div>
                      {!searchInput.rooms ? (
                        <button
                          type="button"
                          className="btn-counter"
                          onClick={() =>
                            setSearchInput({
                              ...searchInput,
                              rooms: searchInput.rooms - 1,
                            })
                          }
                          disabled
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-counter"
                          onClick={() =>
                            setSearchInput({
                              ...searchInput,
                              rooms: searchInput.rooms - 1,
                            })
                          }
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                      )}

                      <span className="mx-2">{searchInput.rooms}</span>
                      <button
                        type="button"
                        className="btn-counter"
                        onClick={() =>
                          setSearchInput({
                            ...searchInput,
                            rooms: searchInput.rooms + 1,
                          })
                        }
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <span>Numero letti</span>
                    <div>
                      {!searchInput.beds ? (
                        <button
                          type="button"
                          className="btn-counter"
                          onClick={() =>
                            setSearchInput({
                              ...searchInput,
                              beds: searchInput.beds - 1,
                            })
                          }
                          disabled
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-counter"
                          onClick={() =>
                            setSearchInput({
                              ...searchInput,
                              beds: searchInput.beds - 1,
                            })
                          }
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                      )}

                      <span className="mx-2">{searchInput.beds}</span>
                      <button
                        type="button"
                        className="btn-counter"
                        onClick={() =>
                          setSearchInput({
                            ...searchInput,
                            beds: searchInput.beds + 1,
                          })
                        }
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <span>Numero bagni</span>
                    <div>
                      {!searchInput.bathrooms ? (
                        <button
                          type="button"
                          className="btn-counter"
                          onClick={() =>
                            setSearchInput({
                              ...searchInput,
                              bathrooms: searchInput.bathrooms - 1,
                            })
                          }
                          disabled
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-counter"
                          onClick={() =>
                            setSearchInput({
                              ...searchInput,
                              bathrooms: searchInput.bathrooms - 1,
                            })
                          }
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                      )}

                      <span className="mx-2">{searchInput.bathrooms}</span>
                      <button
                        type="button"
                        className="btn-counter"
                        onClick={() =>
                          setSearchInput({
                            ...searchInput,
                            bathrooms: searchInput.bathrooms + 1,
                          })
                        }
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-submit-filter"
                  data-bs-dismiss="modal"
                >
                  Applica filtri
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
