import { createContext, useContext, useState, useEffect} from "react";

//creazione del context
const PropertiesContext = createContext();

//creazione del provider e anche export 

export default function PropertiesContextProvider({children}){
    const apiUrl = import.meta.env.VITE_API_URL;

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchProperties();
    }, []);


    const fetchProperties = () => {
         fetch(apiUrl + "/api/properties")
        .then(res => res.json())
        .then((data) => {
            setProperties(data.results);
        })
    }
    return (
        <PropertiesContext.Provider value={properties}>
            {children}
        </PropertiesContext.Provider>
    )
}

export const usePropertiesContext = () => useContext(PropertiesContext);