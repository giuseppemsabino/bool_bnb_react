import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ShowPropertyPage() {
  const propertyId = useParams().id;
  const apiUrl = import.meta.env.VITE_API_URL;

  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchPost(propertyId);
  }, []);

  const fetchPost = (id) => {
    const url = `${apiUrl}/api/properties/${id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data.property);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      {property && (
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
      )}
    </>
  );
}
