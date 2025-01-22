import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ShowPropertyPage() {
  const propertyId = useParams().id;
  const apiUrl = import.meta.env.VITE_API_URL;

  console.log(propertyId);
  console.log(apiUrl);

  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchPost(propertyId);
  }, []);

  const fetchPost = (id) => {
    const url = `${apiUrl}/api/properties/${id}`;
    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setProperty(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="container">
      {property && <p>title: {property.title}</p>}
    </div>
  );
}
