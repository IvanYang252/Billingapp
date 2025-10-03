import { createContext, useEffect, useState} from "react";
import { readCategories } from "../Service/CategoryService";

// Create a global context (like a shared store for the app)
export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    // State to store all categories
    const [categories, setCategories] = useState([]);

    // Runs once when the component loads ([] means only on first render)
    useEffect(() => {
        async function loadData(params) {
            const response = await readCategories(); // Call backend service to get category data
            setCategories(response.data) // Save data into state
        }
        loadData(); // Call function
    }, []);


    // Values to share with all children components
    const contextValue = {
        categories,
        setCategories
    }

    // Provide shared data (context) to all children
    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}