import { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";
import { addItem } from "../../Service/ItemService.js";
import toast from "react-hot-toast";

const ItemForm = () => {
    const {categories, setCategories, items, setItems} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        categoryId: "",
        price: "",
        description: "",
    });

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!image) {
                toast.error("Please select image to keep adding item");
                return;
            }
        setLoading(true);
        const formData = new FormData();
        formData.append("item", JSON.stringify(data));
        formData.append("file", image);
        try {
            const response = await addItem(formData);
            if (response.status === 201) {
                setItems([...items, response.data]);
                setCategories((prevCategories) => prevCategories.map((category) => category.categoryId === data.categoryId ? {...category, itemNums: category.itemNums + 1} : category));
                toast.success("Item added");
                setData({
                    name: "",
                    categoryId: "",
                    price: "",
                    description: "",
                });
                setImage(false);
            } else {
                toast.error("Unable to add item");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unable to add item");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="item-form-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}}> {/*scroll bar*/}
            <div className="mx-2 mt-2">  {/* mx-2: set horizontal margin as 2, mt-2: set top margin as 2 */}
                <div className="row"> {/* row: create a horizontal group of columns */}
                    <div className="card col-md-8 form-container"> {/* col-md-8: on medium and larger screens, the column will take up 8 out of 12 parts of the row */}
                        <div className="card-body"> {/* card-body: add padding around the content inside the card */}
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                    <label htmlFor="image" className="form-label">
                                        <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" className="" width={40}/>
                                    </label>
                                    <input type="file" name="image" id="image" className="form-control" hidden onChange={(e) => setImage(e.target.files[0])}/>
                                </div>
                                <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" 
                                           name="name" 
                                           id="name" 
                                           className="form-control" 
                                           placeholder="Enter item name"
                                           onChange={onChangeHandler}
                                           value={data.name}
                                    /> {/*input text: a single-line text input field*/}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select name="categoryId" id="category" className="form-select" onChange={onChangeHandler} value={data.categoryId}> {/*select: a dropdown list*/}
                                        <option value="">--SELECT CATEGORY--</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.categoryId}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" 
                                           name="price" 
                                           id="price" 
                                           className="form-control" 
                                           placeholder="Enter item price" 
                                           onChange={onChangeHandler} 
                                           value={data.price}/> {/*input number: a numeric input field*/}
                                </div>
                                <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea name="description" 
                                              id="description" 
                                              className="form-control" 
                                              placeholder="Write category description" 
                                              rows={5}
                                              onChange={onChangeHandler}
                                              value={data.description}
                                    ></textarea> {/*textarea: a multi-line text input field*/}
                                </div>
                                <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                                    {loading ? "Saving..." : "Save"}
                                </button> {/*btn btn-primary: Bootstrap classes for styling the button*/}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemForm;
