import { createContext, useEffect, useState} from "react";
import { readCategories } from "../Service/CategoryService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {


    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function loadData(params) {
            const response = await readCategories();
            setCategories(response.data)
        }
        loadData
    }, []);


    const contextValue = {
        categories,
        setCategories
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}