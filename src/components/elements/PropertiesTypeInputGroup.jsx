import { usePropertiesContext } from "../../contexts/PropertiesContext";

export default function PropertiesTypeInputGroup({ handleFunction, idValue }) {
  const { types } = usePropertiesContext();

  return (
    <>
      <div className="btn-group border border-dark p-2 d-flex flex-wrap justify-content-center">
        {types &&
          types.length &&
          types.map((type) => {
            return (
              <div key={type.id}>
                <input
                  type="radio"
                  className="btn-check"
                  name={idValue === "filters-" ? "type_name" : "type_id"}
                  id={idValue + type.id}
                  autoComplete="off"
                  onChange={handleFunction}
                  value={idValue === "filters-" ? type.name : type.id}
                />
                <label className="btn filter-radio" htmlFor={idValue + type.id}>
                  <i className={`fa-solid ${type.icon} me-2`}></i>
                  {type.name}
                </label>
              </div>
            );
          })}
      </div>
    </>
  );
}
