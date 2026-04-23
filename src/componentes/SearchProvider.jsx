import { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    // console.log("digitando:", searchTerm);
    // console.log("API:", `${API_URL}/api/search?q=${searchTerm}`);

    useEffect(() => {

        if (!searchTerm.trim() || searchTerm.length < 2){

            setResults([]);
            return;

        }

        const delayDebounce = setTimeout(async () => {

            try {

                const res = await fetch(
                    `${API_URL}/api/search?q=${searchTerm}`
                );

                const data = await res.json();

                setResults(data.data);

            } catch (err) {

                console.error(err);

            }

        }, 300);

        return () => clearTimeout(delayDebounce);

    }, [searchTerm]);

    return (
        <SearchContext.Provider
            value={{
                searchTerm,
                setSearchTerm,
                results,
                setResults
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch(){
    return useContext(SearchContext);
}