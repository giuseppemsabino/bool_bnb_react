import { useState } from "react";
import { usePropertiesContext } from "../contexts/PropertiesContext";
import Card from "../components/Card";
import PropertiesTypeInputGroup from "../components/PropertiesTypeInputGroup";
import Counter from "../components/Counter";
import InputSearchBar from "../components/InputSearchBar";

export default function SearchPage() {
  const { properties, types } = usePropertiesContext();
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

  function handleChangeFilters(e) {
    setSearchInput({ ...searchInput, [e.target.name]: e.target.value });
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

    for (let i = 0; i < types.length; i++) {
      e.target[i].checked = false;
    }
    e.target[types.length].value = getMinFromProperties();

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
      <div className="container">
        <div>
          <InputSearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setFilteredProperties={setFilteredProperties}
            properties={properties}
            searchpage={true}
          />
        </div>

        {/* FILTRI APPLICATI */}
        {/* <div className="d-flex gap-3 fs-3">
      </div> */}

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

                    <Counter
                      counterName="Numero stanze"
                      setFormData={setSearchInput}
                      formDataCounter={searchInput.rooms}
                      formData={searchInput}
                      counter="rooms"
                    />

                    <Counter
                      counterName="Numero letti"
                      setFormData={setSearchInput}
                      formDataCounter={searchInput.beds}
                      formData={searchInput}
                      counter="beds"
                    />

                    <Counter
                      counterName="Numero bagni"
                      setFormData={setSearchInput}
                      formDataCounter={searchInput.bathrooms}
                      formData={searchInput}
                      counter="bathrooms"
                    />
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
      </div>
    </>
  );
}
