import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { usePropertiesContext } from "../../contexts/PropertiesContext";

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
        setReviews(data.reviews);
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

  console.log(property.n_beds);

  return (
    <>
      {property && (
        <div>
          <div>
            <div className="d-flex justify-content-between mt-3 ">
              <div>
                <h2 className="fw-bold">{property.title}</h2>
              </div>
              <div>
                <span className="text-center share-btn">
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  Condividi
                </span>
              </div>
            </div>
            <div>
              <img className="img-fluid" src={property.image} />
            </div>
            <div className="badge-section">
              <span className="badge text-bg-darkpurple m-1">
                <i className="fa-solid fa-bed"></i> {property.n_beds}
                Letti
              </span>
              <span className="badge text-bg-darkpurple m-1">
                <i className="fa-solid fa-house"></i> {property.n_rooms}
                Camere
              </span>
              <span className="badge text-bg-darkpurple m-1">
                <i className="fa-solid fa-sink"></i> {property.n_bathrooms}
                Bagni
              </span>
            </div>

            <div>
              <p>{property.address}</p>
            </div>
            <div>
              <h5>Allogio:</h5>
              <p>{property.type_name}</p>
            </div>
            <p>{property.email}</p>
            <Button
              className="btn btn-red"
              onClick={() => handleDeleteProperty(property.id)}
            >
              Elimina immobile
            </Button>
          </div>
          <div className="row">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="col-sm-6 col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <img src={review.user_img} className="img-fluid" />
                      <span className="card-title">{`${review.name} ${review.surname}`}</span>
                      <p className="card-text">{review.content}</p>
                      <span>{review.stay_days}</span>
                      <h5>{review.start_date.slice(0, 10)}</h5>
                    </div>
                  </div>
                  <Button
                    className="btn btn-red"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    Elimina
                  </Button>
                </div>
              ))
            ) : (
              <p>No reviews</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
