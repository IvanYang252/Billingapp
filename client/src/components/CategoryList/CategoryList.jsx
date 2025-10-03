import './CategoryList.css'
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const CategoryList = () => {
    const {categories}= useContext(AppContext)
    return (
        <div className="category-list-container" style={{height:'100vh', overflow:'auto', overflow:'hidden'}}>
            <div className="row pe-2">
                search bar
            </div>
            <div className="row g-3 pe-2">
                {categories.map((category, index) => (
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
                                    <button className="btn btn-danger btn-sm">
                                        <i className="bi bi-trash"></i> {/* bootstrap icon */}
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