import './CategoryList.css';
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { deleteCategory } from '../../Service/CategoryService.js';
import toast from 'react-hot-toast';

const CategoryList = () => {
    const {categories, setCategories}= useContext(AppContext)
    const [searchTerm, setSearchTerm] = useState('') // [current state, function for changing the state used in onChange]

    const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const deleteThisCategory = async (categoryId) => {
        try {
            const response = await deleteCategory(categoryId);
            if (response.status === 204) {
                const updatedCategories = categories.filter(category => category.categoryId !== categoryId);
                setCategories(updatedCategories);
                // diplay toast message: need "npm install react-hot-toast"
                toast.success("Category deleted");
            } else {
                // display error message
                toast.error("Unable to delete this category")
            }
        } catch (error) {
            console.log(error)
            toast.error("Unable to delete this category")
        }

    }

    return (
        <div className="category-list-container" style={{height:'100vh', overflow:'auto', overflow:'hidden'}}>
            <div className="row pe-2">
                <div className="input-group mb-3">
                    <input type="text" 
                           name='keyword' 
                           id='keyword' 
                           placeholder='Search by keyword' 
                           className='form-control' 
                           onChange={(e) => setSearchTerm(e.target.value)}
                           value={searchTerm}
                    />
                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i> {/* bootstrap icon(magnifier) */}
                    </span>
                </div>
            </div>
            <div className="row g-3 pe-2">
                {filteredCategories.map((category, index) => (
                    <div key={index} className="col-12">
                        <div className="card p-3" style={{backgroundColor: category.bgColor}}>
                            <div className="d-flex align-items-center">
                                {/* first cloumn */}
                                <div style={{marginRight:'15px'}}>
                                    <img src={category.imageUrl} alt={category.name} className='category-image' />
                                </div>
                                {/* second cloumn */}
                                <div className="flex-grow-1">
                                    <h5 className="mb1 text-white">{category.name}</h5>
                                    <p className="mb-0 text-white">number of items</p>
                                </div>
                                {/* third cloumn */}
                                <div className="btn">
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteThisCategory(category.categoryId)}>
                                        <i className="bi bi-trash"></i> {/* bootstrap icon(trash bin) */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryList;