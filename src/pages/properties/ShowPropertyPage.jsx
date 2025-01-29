import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { usePropertiesContext } from "../../contexts/PropertiesContext";
import ReviewCard from "../../components/ReviewCard";
import Stars from "../../components/Stars";

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
                  <i className="fa-solid fa-arrow-up-from-bracket" /> condividi
                </span>
              </div>
            </div>

            {/* collage section with images of the place  */}
            <div className="collage-images d-flex  justify-content-center">
              <div className="col-md-6 col-lg-6 px-1">
                <img className="" src={property.image} />
              </div>
              <div className="col-12 col-sm-6 col-lg-6  d-flex justify-content-center align-items-center flex-column">
                {/* rating card */}
                <div>
                  <div className="rating-view px-lg-5 py-lg-3">
                    <div className="p-2 text-center text-wrap fw-bolder">
                      Consigli <br /> del viaggiatore
                    </div>
                    <div className="p-2 border-end">
                      <p>Uno dei piu amati</p>
                    </div>

                    <div className="p-2 d-flex flex-column align-items-center">
                      <div>5</div>
                      <p className="stars-size">
                        <span>
                          <Stars rating={3} />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="badge-section">
                    <span className="badge text-bg-badge m-1">
                      <i className="fa-solid fa-bed"> </i> {property.n_beds}{" "}
                      Letti
                    </span>
                    <span className="badge text-bg-badge m-1">
                      <i className="fa-solid fa-house"> </i> {property.n_rooms}{" "}
                      Camere
                    </span>
                    <span className="badge text-bg-badge m-1">
                      <i className="fa-solid fa-sink"></i>{" "}
                      {property.n_bathrooms} Bagni
                    </span>
                  </div>
                </div>
                <div>
                  <h5>
                    Alloggio di tipo:{" "}
                    <span className="badge text-bg-badge my-2">
                      {property.type_name}
                    </span>
                  </h5>
                </div>
              </div>
            </div>

            <div className="py-2">
              <h3>Host della proprietà: {property.host_name} </h3>
              {/* qua si aggiunge il nome dell proprietario quando si farà la tabella */}
              <p className="p-0 m-0">{property.address}</p>
              <p>{property.description}</p>
              {/* <p className="text-end fw-bolder"> €120 / giorno</p> */}
            </div>
            <hr className="line" />

            <div className="map-location">
              {" "}
              {/*map section */}
              <h3>Posizione del immobile</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d149284.69820229863!2d8.980461539844416!3d45.953023351296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47843d32820b62f7%3A0x3e40c4eae898e1e0!2sLago%20di%20Garda!5e0!3m2!1sit!2sit!4v1738079658449!5m2!1sit!2sit"
                height="450"
                loading="lazy"
              ></iframe>
            </div>

            <hr className="line" />

            <div className="d-flex flex-column flex-md-row justify-content-md-between ">
              {" "}
              {/*revi */}
              <div className="row">
                {/*all reviews */}
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="col-md-12 col-lg-6">
                      <ReviewCard review={review} />
                    </div>
                  ))
                ) : (
                  <p>No reviews</p>
                )}
              </div>
              <div>
                {/*form for add reviews */}
                <div className="w-100 form-box m-3 w-md-100">
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">
                      Nome
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="nome"
                      placeholder="Aggiungi il tuo nome"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cognome" className="form-label">
                      Cognome
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="cognome"
                      placeholder="Aggiungi il tuo cognome"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      Scrivi come è andato il tuo soggiorno
                    </label>
                    <textarea
                      className="form-control"
                      id="content"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                {/*email and botton */}
                <div className="m-3">
                  <div>
                    <strong>
                      {" "}
                      Per maggiori informazioni scriva alla seguente mail:
                    </strong>

                    <p className="login-text">{property.email}</p>
                  </div>
                  <Button
                    className="btn btn-red"
                    onClick={() => handleDeleteProperty(property.id)}
                  >
                    Elimina immobile
                  </Button>
                </div>
              </div>
            </div>

            <div className="host d-flex aling-items-sm-center flex-column flex-sm-row">
              <div className="d-flex justify-content-center ">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                />
              </div>
              <div>
                <h2 className="fw-bolder">
                  {property.host_name} {property.host_surname}
                </h2>
                <p>
                  <span>
                    <Stars rating={4} />
                  </span>{" "}
                  &nbsp; &nbsp; 25 recensioni &nbsp; &nbsp; tasso di risposta:
                  100% &nbsp; &nbsp; Tempo di risposta: 60min
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
