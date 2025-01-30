import { usePropertiesContext } from "../../contexts/PropertiesContext";
import Card from "../../components/elements/Card";
import Carousel from "../../components/Carousel";

export default function IndexPropertiesPage() {
  const { properties, filteredProperties, setFilteredProperties } =
    usePropertiesContext();

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
      <div className="empty-container"></div>

      <div className="container">
        <div className="row g-3 my-3">
          {properties.map((property) => (
            <Card property={property} key={property.id} />
          ))}
        </div>
      </div>
    </>
  );
}
