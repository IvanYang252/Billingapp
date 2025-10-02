import axios from "axios";

export const addCategory = async (category) => {
    return await axios.post('http://localhost:8080/api/v1.0/categories', category);
}

export const readCategories = async () => {
    return await axios.get('http://localhost:8080/api/v1.0/categories');
}

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`http://localhost:8080/api/v1.0/categories/${categoryId}`);
}
