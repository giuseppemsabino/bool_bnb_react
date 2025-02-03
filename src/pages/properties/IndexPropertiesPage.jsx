import { usePropertiesContext } from "../../contexts/PropertiesContext";
import Card from "../../components/elements/Card";
import Carousel from "../../components/Carousel";
import InputSearchBar from "../../components/InputSearchBar";
import { useState, useEffect } from "react";
import PopularDestinationCard from "../../components/elements/PopularDestinationCard";
import { useNavigate } from "react-router-dom";

export default function IndexPropertiesPage() {
  const { properties } = usePropertiesContext();
  const { setFilteredProperties, setSelectedItem } = usePropertiesContext();
  const navigate = useNavigate();

  const [firstFiveProperties, setFirstFiveProperties] = useState();
  const apiUrl = import.meta.env.VITE_API_URL;

  const jumboCoversList = [
    "jumbo-cover-1.jpg",
    "jumbo-cover-2.jpg",
    "jumbo-cover-3.jpg",
  ];

  const popularDestinations = [
    { name: "Roma", path: "/img/popularDestinations/rome.jpg" },
    { name: "Milano", path: "/img/popularDestinations/milan.jpg" },
    { name: "Parigi", path: "/img/popularDestinations/paris.jpg" },
    { name: "Amsterdam", path: "/img/popularDestinations/amsterdam.jpg" },
    { name: "Londra", path: "/img/popularDestinations/london.jpg" },
  ];

  function fetchFirstFiveProperties() {
    fetch(apiUrl + "/api/properties/first-six")
      .then((res) => res.json())
      .then((data) => {
        setFirstFiveProperties(data.properties);
      });
  }

  useEffect(() => {
    fetchFirstFiveProperties();
  }, []);

  function handleClickPopularDestination(destination) {
    const newDestination = `, ${destination}`;
    setFilteredProperties(
      properties.filter((property) => {
        return (
          property.title.toLowerCase().includes(newDestination.toLowerCase()) ||
          property.address.toLowerCase().includes(newDestination.toLowerCase())
        );
      })
    );
    setSelectedItem("search");
    navigate("/properties");
  }

  return (
    <>
      <Carousel imagesList={jumboCoversList} page="home"></Carousel>

      <div className="homepage-floating-title">
        <h1 className="homepage-title anton">
          IL TUO SPAZIO IDEALE, IN UN CLICK!
        </h1>
        <InputSearchBar
          properties={properties}
          searchpage={false}
          setSelectedItem={setSelectedItem}
        />
      </div>

      <div className="container">
        <h2 className="first-section-title anton mt-4">LE PIU' APPREZZATE</h2>
        <div className="row g-3 my-3">
          {firstFiveProperties &&
            firstFiveProperties.map((property) => (
              <Card property={property} key={property.id} />
            ))}
        </div>

        <h2 className="second-section-title anton mt-5">METE PIU' RICHIESTE</h2>
        <div>
          <div className="row my-3 g-3 g-md-3 justify-content-between">
            {popularDestinations.map((destination, index) => {
              if (index < 2) {
                return (
                  <PopularDestinationCard
                    key={index}
                    onClick={handleClickPopularDestination}
                    index={index}
                    destination={destination}
                    col="col-12 col-md-6"
                  />
                );
              } else {
                return (
                  <PopularDestinationCard
                    key={index}
                    onClick={handleClickPopularDestination}
                    index={index}
                    destination={destination}
                    col="col-12 col-md-4"
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
