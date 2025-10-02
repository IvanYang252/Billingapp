import "./ManageItems.css";
import ItemForm from "../../components/ItemForm/ItemForm";
import ItemList from "../../components/ItemList/ItemList";

const ManageItems = () => {
    return (
        <div className="items-container text-light"> 
            <div className="left-panel">
                <ItemForm />
            </div>
            <div className="right-panel">
                <ItemList />
            </div>
        </div>
    );
};

export default ManageItems;
