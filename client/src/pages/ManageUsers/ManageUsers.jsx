import UserForm from "../../components/UserForm/UserForm";
import "./ManageUsers.css";
import UserList from "../../components/UserList/UserList";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../Service/UserService.js";
import toast from "react-hot-toast";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function loadAllUsers() {
            try {
                setLoading(true);
                const response = await fetchUsers();
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Unable to fetch users");
            } finally {
                setLoading(false);
            }
        }
        loadAllUsers();
    }, []);

    return (
        <div className="users-container text-light"> 
            <div className="left-panel">
                <UserForm setUsers={setUsers}/>
            </div>
            <div className="right-panel">
                <UserList users={users} setUsers={setUsers}/>
            </div>
        </div>  
    );
};

export default ManageUsers;
