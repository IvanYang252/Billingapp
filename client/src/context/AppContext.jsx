import { createContext, useEffect, useState} from "react";
import { readCategories } from "../Service/CategoryService";
import { getItems } from "../Service/ItemService";

// Create a global context (like a shared store for the app)
export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    // State to store all categories and other context
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [auth, setAuth] = useState({token: null, role: null});

    // Runs once when the component loads ([] means only on first render)
    useEffect(() => {
        async function loadData() {
            const categoryResponse = await readCategories(); // Call backend service to get category data
            const itemResponse = await getItems();
            setCategories(categoryResponse.data); // Save data into state
            setItems(itemResponse.data);
        }
        loadData(); // Call function
    }, []);

    const setAuthData = (token, role) => {
        setAuth({token, role});
    }


    // Values to share with all children components
    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        items,
        setItems,
    }

    // Provide shared data (context) to all children
    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}