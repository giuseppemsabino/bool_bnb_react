import { usePropertiesContext } from "../../contexts/PropertiesContext";
import Card from "../../components/elements/Card";
import Carousel from "../../components/Carousel";
import InputSearchBar from "../../components/InputSearchBar";
import { useState, useEffect } from "react";
import PopularDestinationCard from "../../components/elements/PopularDestinationCard";
import { useNavigate } from "react-router-dom";
import SecondSectionCard from "../../components/elements/SecondSectionCard";

export default function IndexPropertiesPage() {
  const { properties } = usePropertiesContext();
  const {
    setFilteredProperties,
    setSelectedItem,
    setSearchInput,
    searchInput,
  } = usePropertiesContext();
  const navigate = useNavigate();

  const [firstFiveProperties, setFirstFiveProperties] = useState();
  const apiUrl = import.meta.env.VITE_API_URL;

  const jumboCoversList = [
    "jumbo-cover-1.jpg",
    "jumbo-cover-2.jpg",
    "jumbo-cover-3.jpg",
  ];

  const imageCardSecondSection = [
    {
      title: "Zero costi nascosti",
      description: "Il prezzo che vedi è quello che paghi",
      img_url: "locker.png",
    },
    {
      title: "Conferma immediata",
      description:
        "La prenotazione è instantanea per la maggior parte parte dei soggiorni",
      img_url: "manwithcat.png",
    },
    {
      title: "Flessibilità",
      description: "Molte strutture offrono la cancellazione gratuita",
      img_url: "phone.png",
    },
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
    const newSearchInput = searchInput;
    setSearchInput({ ...newSearchInput, text: "" });
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
    const newSearchInput = searchInput;
    setSearchInput({ ...newSearchInput, text: destination });
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
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      </div>

      <div className="container">
        {/* FIRST SECTION */}
        <section className="first-section">
          <h2 className="first-section-title anton mt-4">LE PIU' APPREZZATE</h2>
          <div className="row g-3 my-3">
            {firstFiveProperties &&
              firstFiveProperties.map((property) => (
                <Card property={property} key={property.id} />
              ))}
          </div>
        </section>

        {/* SECOND SECTION */}
        <section className="second-section">
          <div className="row">
            {imageCardSecondSection.map((card, index) => {
              return <SecondSectionCard key={index} card={card} />;
            })}
          </div>
        </section>

        {/* THIRD SECTION */}
        <section className="third-section">
          <h2 className="third-section-title anton mt-5">
            METE PIU' RICHIESTE
          </h2>
          <div className="row my-3 g-3 g-md-3 justify-content-between mb-5">
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
        </section>
      </div>
    </>
  );
}
