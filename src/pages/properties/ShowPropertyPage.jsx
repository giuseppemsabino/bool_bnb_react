import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { usePropertiesContext } from "../../contexts/PropertiesContext";
import ReviewCard from "../../components/ReviewCard";
import Stars from "../../components/Stars";

export default function ShowPropertyPage() {
  const propertyId = useParams().id;
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { fetchProperties } = usePropertiesContext();

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchProperty(propertyId);
  }, []);

  const fetchProperty = (id) => {
    const url = `${apiUrl}/api/properties/${id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data.property);
        const newReviews = data.reviews;
        const reviewsAvg = () => {
          const reviewRatings = [];

          newReviews.forEach((review) =>
            reviewRatings.push(parseInt(review.rating))
          );

          return (
            reviewRatings.reduce((sum, rating) => sum + rating) /
            reviewRatings.length
          );
        };
        setReviews({ list: newReviews, reviewsAvg: reviewsAvg() });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteProperty = (id) => {
    const url = `${apiUrl}/api/properties/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProperties();
        navigate("/properties");
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteReview = (id) => {
    const url = `${apiUrl}/api/properties/reviews/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProperty(propertyId);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      {property && (
        <div>
          <h3 className="mt-3">DETTAGLIO IMMOBILE</h3>
          <div>
            <div className="my-3">
              <h1 className="fw-bold">{property.title}</h1>
            </div>

            <div className="row p-2">
              <div className="col-md-8">
                <img className="img-fluid" src={property.image} />
              </div>
              <div className="col-md-4 d-flex justify-content-around flex-column">
                <div className="text-center border-bottom">
                  <span className="text-decoration-underline">
                    Proprietario
                  </span>
                  <h2>
                    {property.host_name} {property.host_surname}
                  </h2>
                </div>
                <div className="text-center">
                  <span className="text-decoration-underline">Descrizione</span>
                  <p className="fs-5 fw-medium">{property.description}</p>
                  <span className="text-decoration-underline">
                    {property.email}
                  </span>
                </div>
                <div className="p-2 d-flex flex-column align-items-center justify-content-center">
                  <div>
                    <h4>
                      <i className="fa-solid fa-star mx-1"></i>
                      <span className="px-2">
                        {reviews.reviewsAvg.toFixed(1)}
                      </span>
                      <a
                        className="link-secondary link-offset-2"
                        href="#reviewsSection"
                      >
                        <span className="px-2 border-start border-dark">
                          {reviews.list.length} Recensioni
                        </span>
                      </a>
                    </h4>
                  </div>
                </div>

                <div className="text-center p-2 d-flex justify-content-around">
                  <span className="badge text-bg-secondary">
                    <i className={`fa-solid ${property.type_icon} mx-1`}></i>
                    {property.type_name}
                  </span>
                  <span className="badge text-bg-secondary">
                    <i className="fa-solid fa-bed mx-1"></i>
                    {property.n_beds} Letti
                  </span>
                  <span className="badge text-bg-secondary">
                    <i className="fa-solid fa-house mx-1"></i>
                    {property.n_rooms} Camere
                  </span>
                  <span className="badge text-bg-secondary">
                    <i className="fa-solid fa-sink mx-1"></i>
                    {property.n_bathrooms} Bagni
                  </span>
                </div>
              </div>
            </div>

            <hr />

            <div className="map-location">
              <h3>Posizione del immobile</h3>
              <h4 className="text-decoration-underline">{property.address}</h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d149284.69820229863!2d8.980461539844416!3d45.953023351296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47843d32820b62f7%3A0x3e40c4eae898e1e0!2sLago%20di%20Garda!5e0!3m2!1sit!2sit!4v1738079658449!5m2!1sit!2sit"
                height="450"
                loading="lazy"
              ></iframe>
            </div>

            <hr />

            <div className="d-flex flex-column my-4 py-4" id="reviewsSection">
              <div className="row g-5 mb-4">
                <h3>RECENSIONI</h3>
                {reviews.list.length > 0 ? (
                  reviews.list.map((review) => (
                    <div key={review.id} className="col-md-12 col-lg-6">
                      <ReviewCard review={review} />
                    </div>
                  ))
                ) : (
                  <p>No reviews</p>
                )}
              </div>
              <div>
                <div className="row g-3 form-box m-3 p-4">
                  <h3>SCRIVI LA TUA RECENSIONE</h3>
                  <div className="col-4">
                    <label htmlFor="nameInput" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameInput"
                      placeholder="Aggiungi il tuo nome"
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="surnameInput" className="form-label">
                      Cognome
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="surnameInput"
                      placeholder="Aggiungi il tuo cognome"
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="emailInput" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label" htmlFor="ratingInput">
                      Voto
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Inserisci un voto da 1 a 5"
                      id="ratingInput"
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label" htmlFor="daysInput">
                      Giorni di permanenza
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Inserisci i tuoi giorni di permanenza"
                      id="daysInput"
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label" htmlFor="dateInput">
                      Data di partenza
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateInput"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="content" className="form-label">
                      Scrivi come è andato il tuo soggiorno
                    </label>
                    <textarea
                      className="form-control"
                      id="content"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="m-3">
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProperty(property.id)}
                  >
                    Elimina immobile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
