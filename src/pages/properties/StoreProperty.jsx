import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertiesContext } from "../../contexts/PropertiesContext";
import Counter from "../../components/functions/Counter";
import PropertiesTypeInputGroup from "../../components/elements/PropertiesTypeInputGroup";
import StoreModal from "../../components/elements/StoreModal";

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
  const [okState, setOkState] = useState(false);

  // functions
  function handleSubmitFormData(e) {
    e.preventDefault();
    if (formData.title) {
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
        });
    } else {
      setOkState(false);
    }
  }

  function handleInputFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setOkState(true);
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9 col-xxl-6">
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
                    required
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
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="#square_meters">
                    Inserisci metratura
                  </label>
                  <input
                    id="square_meters"
                    type="number"
                    className="form-control"
                    name="square_meters"
                    value={formData.square_meters}
                    onChange={handleInputFormData}
                    required
                  />
                </div>

                <PropertiesTypeInputGroup
                  handleFunction={handleInputFormData}
                  idValue="insert-"
                />

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
                        required
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
                        required
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
                    required
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
                  required
                ></textarea>
              </div>
              <div className="text-end   mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={okState ? "#createProperty" : ""}
                >
                  Inserisci
                </button>
              </div>
              <StoreModal
                id="createProperty"
                body="Proprietà aggiunta con successo"
                path="/"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
