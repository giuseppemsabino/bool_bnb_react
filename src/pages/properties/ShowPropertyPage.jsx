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
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> condividi
                </span>
              </div>
            </div>
            <div className="">
              <img className="img-fluid" src={property.image} />
            </div>
            <div className="badge-section">
              <span className="badge text-bg-darkpurple m-1">
                <i className="fa-solid fa-bed"></i> {property.n_beds} Letti
              </span>
              <span className="badge text-bg-darkpurple m-1">
                <i className="fa-solid fa-house"></i> {property.n_rooms} Camere
              </span>
              <span className="badge text-bg-darkpurple m-1">
                <i className="fa-solid fa-sink"></i> {property.n_bathrooms}{" "}
                Bagni
              </span>
            </div>

            <div>
              <p>Roma, Italia, {property.address}</p>
            </div>
            <div>
              <h5>Allogio di tipo:</h5>
              <p>{property.type}</p>
            </div>
            <p>{property.email}</p>
            <Button
              className="btn btn-red"
              onClick={() => handleDeleteProperty(property.id)}
            >
              Elimina immobile
            </Button>
          </div>
          <div>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id}>
                  <img src={review.user_img} />
                  <span>{review.name}</span>
                  <span>{review.surname}</span>
                  <p>{review.content}</p>
                  <p>{review.stay_days}</p>
                  <p>{review.start_date.slice(0, 10)}</p>
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
