import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import {assets} from "../../assets/assets.js";
import toast from "react-hot-toast";
import {addCategory} from "../../Service/CategoryService.js";

const CategoryForm = () => {

    const {categories, setCategories} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false); 
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
    });

    /* Monitor what's included in []. For this instance, once data changes, do action (This is why it's called "use effect to do something") */
    useEffect(() => {
        console.log(data); // action
    }, [data])

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Please select image to keep adding category")
        }
        setLoading(true);
        // FormData is a special object used to construct a set of key/value pairs representing form fields and their values.
        // It's the standard way to send data, especially when file uploads are involved.
        const formData = new FormData();
        formData.append("category", JSON.stringify(data));
        formData.append("file", image);
        try {
            const response = await addCategory(formData);
            if (response.status === 201) {
                setCategories([...categories, response.data]);
                toast.success("Category added");
                setData({
                    name: "",
                    description: "",
                    bgColor: "#2c2c2c",
                });
                setImage(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error adding Category")
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
                                <label htmlFor="image" className="form-label">Upload Image
                                    <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" className="" width={40}/>
                                </label>
                                <input type="file" name="image" id="image" className="form-control" hidden onChange={(e) => setImage(e.target.files[0])}/>
                            </div>
                            <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" name="name" id="name" className="form-control" placeholder="Enter category name" 
                                    onChange={onChangeHandler}
                                    value={data.name}
                                /> {/*input text: a single-line text input field*/}
                            </div>
                            <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea name="description" id="description" className="form-control" placeholder="Write category description" rows={5}
                                    onChange={onChangeHandler}
                                    value={data.description}
                                ></textarea> {/*textarea: a multi-line text input field*/}
                            </div>
                            <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                <label htmlFor="bgcolor" className="form-label">Background Color</label>
                                <br/>
                                <input type="color" name="bgColor" id="bgColor" placeholder="#ffffff"
                                    onChange={onChangeHandler}
                                    value={data.bgColor}
                                />
                            </div>
                            <button type="submit" 
                                    disabled={loading}
                                    className="btn btn-warning w-100">{loading ? "loading..." : "submit"}
                            </button> {/*btn btn-primary: Bootstrap classes for styling the button*/}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryForm;