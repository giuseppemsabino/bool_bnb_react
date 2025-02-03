import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePropertiesContext } from "../../contexts/PropertiesContext";
import ReviewCard from "../../components/reviews/ReviewCard";
import ReviewsForm from "../../components/reviews/ReviewsForm";
import Carousel from "../../components/Carousel";

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

        if (data.reviews.length) {
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
        }
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
              <div className="col-lg-8">
                <Carousel
                  imagesList={property.images.map((image) => image.img_url)}
                />
              </div>
              <div className="col-lg-4 d-flex justify-content-around flex-column">
                <div className="text-center border-bottom">
                  <span className="fw-semibold">Proprietario</span>
                  <h2 className="fw-bold">
                    {property.host_name} {property.host_surname}
                  </h2>
                </div>
                <div className="text-center mt-2">
                  <span className="fw-semibold">Descrizione</span>
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
                        {reviews.reviewsAvg && reviews.reviewsAvg.toFixed(1)}
                      </span>
                      <a
                        className="link-secondary link-offset-2"
                        href="#reviewsSection"
                      >
                        <span className="px-2 border-start border-dark">
                          {reviews.list && reviews.list.length} Recensioni
                        </span>
                      </a>
                    </h4>
                  </div>
                </div>

                <div className="text-center p-2 d-flex justify-content-center flex-wrap gap-3">
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

            <div className="d-flex flex-column my-4" id="reviewsSection">
              <div className="row g-2 my-4">
                <h3>RECENSIONI</h3>
                {reviews.list && reviews.list.length > 0 ? (
                  reviews.list.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <p>No reviews</p>
                )}
              </div>
              <ReviewsForm
                fetchProperty={fetchProperty}
                propertyId={property.id}
              />
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteProperty"
                >
                  Elimina immobile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="modal fade"
        id="deleteProperty"
        tabIndex="-1"
        aria-labelledby="deletePropertyLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deletePropertyLabel">
                Eliminazione Proprietà
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              La procedura è irreversibile, sei sicuro di voler procedere?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Annulla
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDeleteProperty()}
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="deleteReview"
        tabIndex="-1"
        aria-labelledby="deleteReviewLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteReviewLabel">
                Eliminazione Recensione
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              La procedura è irreversibile, sei sicuro di voler procedere?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Annulla
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDeleteReview}
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
