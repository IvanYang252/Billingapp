const UserForm = () => {
    return (
        <div className="mx-2 mt-2">  {/* mx-2: set horizontal margin as 2, mt-2: set top margin as 2 */}
            <div className="row"> {/* row: create a horizontal group of columns */}
                <div className="card col-md-8 form-container"> {/* col-md-8: on medium and larger screens, the column will take up 8 out of 12 parts of the row */}
                    <div className="card-body"> {/* card-body: add padding around the content inside the card */}
                        <form>
                            <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" name="name" id="name" className="form-control" placeholder="Enter user name"/>
                            </div>
                            <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name="email" id="email" className="form-control" placeholder="Enter user email"/>
                            </div>
                            <div className="mb-3"> {/* mb-3: set bottom margin as 3 */}
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" id="password" className="form-control" placeholder="Enter user password"/>
                            </div>
                            <button type="submit" className="btn btn-warning w-100">Save User</button> {/*btn btn-warning: Bootstrap classes for styling the button*/}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm;
