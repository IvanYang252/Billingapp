import { useState } from "react";
import { addUser } from "../../Service/UserService.js"
import toast from "react-hot-toast";

const UserForm = ({setUsers}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER"
    });

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault(); // prevents the default action of submitting the form and reloading the page
        setLoading(true);
        try {
            const response = await addUser(data);
            setUsers((prevUsers) => [...prevUsers, response.data]);
            toast.success("User Added");
            setData({
                name: "",
                email: "",
                password: "",
                role: "ROLE_USER",
            });
        } catch (error) {
            console.error(error);
            toast.error("Error adding user");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-2 mt-2">  {/* mx-2: set horizontal margin as 2, mt-2: set top margin as 2 */}
            <div className="row"> {/* row: create a horizontal group of columns */}
                <div className="card col-md-12 form-container"> {/* col-md-8: on medium and larger screens, the column will take up 8 out of 12 parts of the row */}
                    <div className="card-body"> {/* card-body: add padding around the content inside the card */}
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" 
                                       name="name" 
                                       id="name" 
                                       className="form-control" 
                                       placeholder="Enter user name"
                                       onChange={onChangeHandler}
                                       value={data.name}
                                />
                            </div>
                            <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" 
                                       name="email" 
                                       id="email" 
                                       className="form-control" 
                                       placeholder="Enter user email"
                                       onChange={onChangeHandler}
                                       value={data.email}
                                />
                            </div>
                            <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" 
                                       name="password" 
                                       id="password" 
                                       className="form-control" 
                                       placeholder="Enter user password"
                                       onChange={onChangeHandler}
                                       value={data.password}
                                />
                            </div>
                            <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                                {loading ? "Loading..." : "Save"}
                            </button> {/*btn btn-warning: Bootstrap classes for styling the button*/}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm;
