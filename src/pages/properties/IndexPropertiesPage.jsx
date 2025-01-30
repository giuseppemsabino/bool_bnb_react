import { usePropertiesContext } from "../../contexts/PropertiesContext";
import Card from "../../components/elements/Card";
import Carousel from "../../components/Carousel";
import { useState } from "react";

export default function IndexPropertiesPage() {
  const { properties } = usePropertiesContext();
  const [filteredProperties, setFilteredProperties] = useState([]);

  const jumboCoversList = [
    "jumbo-cover-1.jpg",
    "jumbo-cover-2.jpg",
    "jumbo-cover-3.jpg",
  ];

  return (
    <>
      <Carousel
        imagesList={jumboCoversList}
        homepage={true}
        filteredProperties={filteredProperties}
        setFilteredProperties={setFilteredProperties}
        properties={properties}
      ></Carousel>
      <div className="container">
        <h1 className="mt-3">TUTTI GLI IMMOBILI</h1>
        <div className="row g-3 mt-3">
          {properties.map((property) => (
            <Card property={property} key={property.id} />
          ))}
        </div>
      </div>
    </>
  );
}
