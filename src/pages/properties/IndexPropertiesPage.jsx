import { usePropertiesContext } from "../../contexts/PropertiesContext";
import Card from "../../components/Card";

export default function IndexPropertiesPage() {
  const { properties } = usePropertiesContext();

  return (
    <>
      {/* <form>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="Appartamento"
            onChange={handleFilter}

          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Appartamento
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            value="Casa"
            onChange={handleFilter}


          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Casa 
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault3"
            value="Villa"
            onChange={handleFilter}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault3">
            Villa  
          </label>
        </div>
      </form> */}

      <div className="row g-3 mt-3">
        {properties.map((property) => (
          <Card property={property} key={property.id} />
        ))}
      </div>
    </>
  );
}
