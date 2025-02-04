import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertiesContext } from "../../contexts/PropertiesContext";
import Counter from "../../components/functions/Counter";
import PropertiesTypeInputGroup from "../../components/elements/PropertiesTypeInputGroup";

export default function StoreProperty() {
  // declarations
  const defaultFormData = {
    title: "",
    address: "",
    image: "",
    type_id: "",
    host_name: "",
    host_surname: "",
    email: "",
    description: "",
    n_rooms: 0,
    n_bathrooms: 0,
    n_beds: 0,
    square_meters: 0,
  };

  const { fetchProperties, setSelectedItem } = usePropertiesContext();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState(defaultFormData);

  // functions
  function handleSubmitFormData(e) {
    e.preventDefault();

    fetch(apiUrl + "/api/properties", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProperties();
        setSelectedItem("home");
        navigate("/");
      });
  }

  function handleInputFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-6">
            <h1>Inserimento immobile</h1>
            <form onSubmit={handleSubmitFormData}>
              <div className="my-4">
                <label htmlFor="basic-url" className="form-label">
                  <strong>Informazioni immobile</strong>
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Inserisci titolo"
                    name="title"
                    value={formData.title}
                    onChange={handleInputFormData}
                  />
                </div>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Inserisci indirizzo"
                    name="address"
                    value={formData.address}
                    onChange={handleInputFormData}
                  />
                </div>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Inserisci immagine"
                    name="image"
                    value={formData.image}
                    onChange={handleInputFormData}
                  />
                </div>

                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Inserisci metratura"
                    name="square_meters"
                    value={formData.square_meters}
                    onChange={handleInputFormData}
                  />
                </div>

                <div className="text-center">
                  <PropertiesTypeInputGroup
                    handleFunction={handleInputFormData}
                    idValue="insert-"
                  />
                </div>

                <div className="border border-dark px-5 py-3 mt-3 rounded">
                  <Counter
                    counterName="Numero stanze"
                    setFormData={setFormData}
                    formDataCounter={formData.n_rooms}
                    formData={formData}
                    counter="n_rooms"
                  />

                  <Counter
                    counterName="Numero letti"
                    setFormData={setFormData}
                    formDataCounter={formData.n_beds}
                    formData={formData}
                    counter="n_beds"
                  />

                  <Counter
                    counterName="Numero bagni"
                    setFormData={setFormData}
                    formDataCounter={formData.n_bathrooms}
                    formData={formData}
                    counter="n_bathrooms"
                  />
                </div>
              </div>

              <div className="my-4">
                <label htmlFor="basic-url" className="form-label">
                  <strong>Informazioni host</strong>
                </label>
                <div className="row g-1">
                  <div className="col-6">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Inserisci nome"
                        name="host_name"
                        value={formData.host_name}
                        onChange={handleInputFormData}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Inserisci cognome"
                        name="host_surname"
                        value={formData.host_surname}
                        onChange={handleInputFormData}
                      />
                    </div>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Inserisci email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputFormData}
                  />
                </div>
              </div>

              <div className="input-group">
                <textarea
                  className="form-control"
                  placeholder="Inserisci descrizione"
                  name="description"
                  value={formData.description}
                  onChange={handleInputFormData}
                ></textarea>
              </div>
              <div className="text-end   mt-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#createProperty"
                >
                  Inserisci
                </button>
              </div>
              <div className="modal" tabIndex="-1" id="createProperty">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Modal title</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="submit"
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                      >
                        Ok
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
