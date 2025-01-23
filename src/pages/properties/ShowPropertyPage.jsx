import { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";


export default function ShowPropertyPage() {
  const propertyId = useParams().id;
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

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
  }
 
  return (
    <>
      {property && (
          <div>
        <div>
          <h1>{property.title}</h1>
          <img src={property.image} />
          <p>{property.n_beds}</p>
          <p>{property.n_rooms}</p>
          <p>{property.n_bathrooms}</p>
          <p>{property.type}</p>
          <p>{property.address}</p>
          <p>{property.email}</p>
        </div>
        <div>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id}>
                <span>{review.name}</span>
                <span>{review.surname}</span>
                <p>{review.content}</p>
                <p>{review.stay_days}</p>
                <p>{review.start_date.slice(0,10)}</p>
                <Button className="btn btn-danger" onClick={() => handleDeleteReview(review.id)}>Elimina</Button>
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
