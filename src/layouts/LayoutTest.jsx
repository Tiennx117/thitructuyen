const LayoutTest = () => {
    return (<>
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2  bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Menu</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <a href="#" className="nav-link align-middle ">
                                    <i className="fa fa-home" /> <span className="ms-1 d-none d-sm-inline">Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="#submenu1" data-bs-toggle="collapse" data-bs-target="#submenu1" className="nav-link  align-middle">
                                    <i className="fa fa-home" /> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                                <div className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <div >
                                        <div className="w-100">
                                            <a href="#" className="nav-link "> <span className="d-none d-sm-inline">Item</span> 1 </a>
                                        </div>
                                        <div className="w-100">
                                            <a href="#" className="nav-link "> <span className="d-none d-sm-inline">Item</span> 2 </a>
                                        </div>
                                        <div className="w-100">
                                            <a href="#" className="nav-link "> <span className="d-none d-sm-inline">Item</span> 1 </a>
                                        </div>
                                        <div className="w-100">
                                            <a href="#" className="nav-link "> <span className="d-none d-sm-inline">Item</span> 2 </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="#" className="nav-link  align-middle">
                                    <i className="fa fa-home" /> <span className="ms-1 d-none d-sm-inline">Orders</span></a>
                            </li>
                            <li>
                                <a href="#submenu2" data-bs-toggle="collapse" className="nav-link  align-middle ">
                                    <i className="fa fa-home" /> <span className="ms-1 d-none d-sm-inline">Bootstrap</span></a>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <div> <li className="w-100">
                                        <a href="#" className="nav-link "> <span className="d-none d-sm-inline">Item</span> 1</a>
                                    </li>
                                        <li>
                                            <a href="#" className="nav-link "> <span className="d-none d-sm-inline">Item</span> 2</a>
                                        </li>
                                    </div>
                                </ul>
                            </li>
                            <li>
                                <a href="#submenu3" data-bs-toggle="collapse" className="nav-link  align-middle">
                                    <i className="fa fa-home" /> <span className="ms-1 d-none d-sm-inline">Products</span> </a>
                                <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                    <div>
                                        <li className="w-100">
                                            <a href="#" className="nav-link "> <span className="d-none d-sm-inline">Product</span> 1</a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link "> <span className="d-none d-sm-inline">Product</span> 2</a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link "> <span className="d-none d-sm-inline">Product</span> 3</a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link "> <span className="d-none d-sm-inline">Product</span> 4</a>
                                        </li>
                                    </div>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="nav-link  align-middle">
                                    <i className="fa fa-home" /> <span className="ms-1 d-none d-sm-inline">Customers</span> </a>
                            </li>
                        </ul>
                        <hr />
                        <div className="dropdown pb-4">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="hugenerd" width={30} height={30} className="rounded-circle" />
                                <span className="d-none d-sm-inline mx-1">loser</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                <li><a className="dropdown-item" href="#">New project...</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col py-3">

                    <h3>Left Sidebar with Submenus</h3>
                    <p className="lead">
                        An example 2-level sidebar with collasible menu items. The menu functions like an "accordion" where only a single
                        menu is be open at a time. While the sidebar itself is not toggle-able, it does responsively shrink in width on smaller screens.</p>
                    <ul className="list-unstyled">
                        <li><h5>Responsive</h5> shrinks in width, hides text labels and collapses to icons only on mobile</li>
                    </ul>
                </div>
            </div>
        </div>

    </>)
}
export default LayoutTest;