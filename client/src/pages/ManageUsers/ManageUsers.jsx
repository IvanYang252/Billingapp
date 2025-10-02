import UserForm from "../../components/UserForm/UserForm";
import "./ManageUsers.css";
import UserList from "../../components/UserList/UserList";

const ManageUsers = () => {
    return (
        <div className="users-container text-light"> 
            <div className="left-panel">
                <UserForm />
            </div>
            <div className="right-panel">
                <UserList />
            </div>
        </div>  
    );
};

export default ManageUsers;
