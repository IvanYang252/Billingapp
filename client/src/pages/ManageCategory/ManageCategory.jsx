import "./ManageCategory.css";
import CategoryForm from "../../components/CategoryForm/CategoryForm.jsx";
import CategoryList from "../../components/CategoryList/CategoryList.jsx";

const ManageCategory = () => {
    return (
        <div className="category-container text-light"> 
            <div className="left-panel">
                <CategoryForm />
            </div>
            <div className="right-panel">
                <CategoryList />
            </div>
        </div>
    );
};

export default ManageCategory;