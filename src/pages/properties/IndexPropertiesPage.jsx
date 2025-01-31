import { usePropertiesContext } from "../../contexts/PropertiesContext";
import Card from "../../components/elements/Card";
import Carousel from "../../components/Carousel";
import InputSearchBar from "../../components/InputSearchBar";

export default function IndexPropertiesPage() {
  const { properties } = usePropertiesContext();

  const jumboCoversList = [
    "jumbo-cover-1.jpg",
    "jumbo-cover-2.jpg",
    "jumbo-cover-3.jpg",
  ];

  return (
    <>
      <Carousel imagesList={jumboCoversList}></Carousel>

      <div className="homepage-floating-title">
        <h1 className="homepage-title">IL TUO SPAZIO IDEALE, IN UN CLICK!</h1>
        <InputSearchBar properties={properties} searchpage={false} />
      </div>

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
