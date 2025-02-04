import { createContext, useContext, useState, useEffect } from "react";

//creazione del context
const PropertiesContext = createContext();

//creazione del provider e anche export

export default function PropertiesContextProvider({ children }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const defaultSearchInput = {
    text: "",
    rooms: 0,
    beds: 0,
    bathrooms: 0,
    squareMeters: 0,
    type_name: "",
  };

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [searchInput, setSearchInput] = useState(defaultSearchInput);

  useEffect(() => {
    fetchProperties();
    fetchTypes();
  }, []);

  const fetchProperties = () => {
    fetch(apiUrl + "/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
      });
  };

  const fetchTypes = () => {
    fetch(apiUrl + "/api/properties/types")
      .then((res) => res.json())
      .then((data) => {
        setTypes(data.types);
      });
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        types,
        fetchProperties,
        setProperties,
        filteredProperties,
        setFilteredProperties,
        selectedItem,
        setSelectedItem,
        searchInput,
        setSearchInput,
        defaultSearchInput,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export const usePropertiesContext = () => useContext(PropertiesContext);
