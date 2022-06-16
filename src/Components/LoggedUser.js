import React from "react";

import AddAuthor from "./AddAuthor";
import AddBooks from "./AddBooks";
import ViewBooks from "./ViewBooks";
function LoggedUser() {
  return (
    <div>
      <div className="row">
        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
          <AddAuthor />
        </div>
        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
          <AddBooks />
        </div>
      </div>
      <div className=""><ViewBooks/></div>
    </div>
  );
}

export default LoggedUser;

{
  /* routes for products and cart */
}
{
  /* <Router>
<ul className="nav nav-pills d-flex justify-content-center">
  <li className="nav-item">
    <NavLink
      className="nav-link"
      activeStyle={linkStyle}
      to={`${url}/add-author`}
    >
      Add Author
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink
      className="nav-link"
      activeStyle={linkStyle}
      to={`${url}/add-books`}
    >
      Add Books
    </NavLink>
  </li>
</ul>
<Routes>
  <Route path={`${path}/add-author`} element={<AddAuthor />} />
  <Route path={`${path}/add-books`} element={<AddBooks />} />
</Routes>
</Router> */
}
