const ItemForm = () => {
    return (
        <div className="item-form-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}}> {/*scroll bar*/}
            <div className="mx-2 mt-2">  {/* mx-2: set horizontal margin as 2, mt-2: set top margin as 2 */}
                <div className="row"> {/* row: create a horizontal group of columns */}
                    <div className="card col-md-8 form-container"> {/* col-md-8: on medium and larger screens, the column will take up 8 out of 12 parts of the row */}
                        <div className="card-body"> {/* card-body: add padding around the content inside the card */}
                            <form>
                                <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                    <label htmlFor="image" className="form-label">
                                        <img src="https://placehold.co/48x48" alt="" className="" width={40}/>
                                    </label>
                                    <input type="file" name="image" id="image" className="form-control" hidden/>
                                </div>
                                <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" name="name" id="name" className="form-control" placeholder="Enter item name"/> {/*input text: a single-line text input field*/}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select name="category" id="category" className="form-select"> {/*select: a dropdown list*/}
                                        <option value="">--SELECT CATEGORY--</option>
                                        <option value="1">Category 1</option>
                                        <option value="2">Category 2</option>
                                        <option value="3">Category 3</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" name="price" id="price" className="form-control" placeholder="Enter item price"/> {/*input number: a numeric input field*/}
                                </div>
                                <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea name="description" id="description" className="form-control" placeholder="Write category description" rows={5}></textarea> {/*textarea: a multi-line text input field*/}
                                </div>
                                <button type="submit" className="btn btn-warning w-100">Save Category</button> {/*btn btn-primary: Bootstrap classes for styling the button*/}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemForm;
