import { useState } from "react";
import { usePropertiesContext } from "../contexts/PropertiesContext";
import Card from "../components/Card";

export default function HomePage() {
  const defaultSearchInput = {
    text: "",
  };
  const { properties } = usePropertiesContext();

  const [searchInput, setSearchInput] = useState(defaultSearchInput);
  const [filteredProperties, setFilteredProperties] = useState([]);

  function handleChangeInput(e) {
    console.log(e.target.value);
    setSearchInput({ ...searchInput, [e.target.name]: e.target.value });

    setFilteredProperties(
      properties.filter((property) => {
        return (
          property.title
            .toLowerCase()
            .includes(searchInput.text.toLowerCase()) ||
          property.address
            .toLowerCase()
            .includes(searchInput.text.toLowerCase())
        );
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchInput(defaultSearchInput);
  }

  function getMinFromProperties() {
    let min = properties[0].square_meters;
    properties.forEach((property, index) => {
      if (index && property.square_meters < min) min = property.square_meters;
    });
    return min;
  }

  console.log(getMinFromProperties());

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h1 className="my-4">Cerca il tuo immobile</h1>
          <div className="row g-0">
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
                Filtri
              </h5>
            </div>
          </div>
        </form>
      </div>

      <div className="row mt-5">
        {filteredProperties.map((property) => {
          return <Card property={property} />;
        })}
      </div>

      {/* MODAL */}
      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
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
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <section>
                <h5>Tipo di alloggio</h5>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio1"
                    autocomplete="off"
                  />
                  <label className="btn btn-outline-primary" for="btnradio1">
                    Radio 1
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio2"
                    autocomplete="off"
                  />
                  <label className="btn btn-outline-primary" for="btnradio2">
                    Radio 2
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio3"
                    autocomplete="off"
                  />
                  <label className="btn btn-outline-primary" for="btnradio3">
                    Radio 3
                  </label>
                </div>
              </section>

              <hr />

              <section>
                <h5>Metratura</h5>
                <label for="customRange3" className="form-label">
                  Example range
                </label>
                <input
                  type="range"
                  className="form-range"
                  min={properties.length && (() => getMinFromProperties())}
                  max="5"
                  step="0.1"
                  id="customRange3"
                />
              </section>

              <hr />

              <section>
                <h5>Stanze, letti e bagni</h5>
              </section>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
