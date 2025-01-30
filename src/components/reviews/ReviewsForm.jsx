import { useState } from "react";

export default function ReviewsForm({ propertyId, fetchProperty }) {
  const defaultFormData = {
    name: "",
    surname: "",
    rating: "",
    stay_days: "",
    start_date: "",
    content: "",
    property_id: propertyId,
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState(defaultFormData);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch(apiUrl + "/api/properties/" + propertyId, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setFormData(defaultFormData);
        fetchProperty(propertyId);
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="row g-3 my-3 rounded shadow p-3">
        <div className="col-10">
          <h3 className="d-inline">SCRIVI LA TUA RECENSIONE</h3>
        </div>
        <div className="col-2 text-end">
          <button className="btn btn-success ms-auto" type="submit">
            INVIA
          </button>
        </div>
        <div className="col-sm-6">
          <label htmlFor="nameInput" className="form-label">
            Nome
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleFormData}
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="Aggiungi il tuo nome"
            required
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="surnameInput" className="form-label">
            Cognome
          </label>
          <input
            name="surname"
            value={formData.surname}
            onChange={handleFormData}
            type="text"
            className="form-control"
            id="surnameInput"
            placeholder="Aggiungi il tuo cognome"
            required
          />
        </div>

        <div className="col-sm-6 col-lg-4">
          <label className="form-label" htmlFor="ratingInput">
            Voto
          </label>
          <input
            name="rating"
            value={formData.rating}
            onChange={handleFormData}
            type="number"
            className="form-control"
            placeholder="Inserisci un voto da 1 a 5"
            id="ratingInput"
            required
          />
        </div>
        <div className="col-sm-6 col-lg-4">
          <label className="form-label" htmlFor="daysInput">
            Giorni di permanenza
          </label>
          <input
            name="stay_days"
            value={formData.stay_days}
            onChange={handleFormData}
            type="number"
            className="form-control"
            placeholder="Inserisci i tuoi giorni di permanenza"
            id="daysInput"
            required
          />
        </div>
        <div className="col-lg-4">
          <label className="form-label" htmlFor="dateInput">
            Data di partenza
          </label>
          <input
            name="start_date"
            value={formData.start_date}
            onChange={handleFormData}
            type="date"
            className="form-control"
            id="dateInput"
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="contentInput" className="form-label">
            Scrivi come è andato il tuo soggiorno
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleFormData}
            className="form-control"
            id="contentInput"
            rows="3"
            required
          ></textarea>
        </div>
      </div>
    </form>
  );
}
