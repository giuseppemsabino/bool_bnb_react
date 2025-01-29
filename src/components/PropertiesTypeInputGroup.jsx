import { usePropertiesContext } from "../contexts/PropertiesContext";

export default function PropertiesTypeInputGroup({ handleFunction, idValue }) {
  const { properties } = usePropertiesContext();

  return (
    <>
      <div className="btn-group border border-dark p-2" role="group">
        {properties &&
          properties.length &&
          properties.map((property) => {
            return (
              <div key={property.id}>
                <input
                  type="radio"
                  className="btn-check"
                  name={idValue === "filters-" ? "type_name" : "type_id"}
                  id={idValue + property.id}
                  autoComplete="off"
                  onChange={handleFunction}
                  value={
                    idValue === "filters-"
                      ? property.type_name
                      : property.type_id
                  }
                />
                <label
                  className="btn filter-radio"
                  htmlFor={idValue + property.id}
                >
                  <i className={`fa-solid ${property.type_icon} me-2`}></i>
                  {property.type_name}
                </label>
              </div>
            );
          })}
      </div>
    </>
  );
}
