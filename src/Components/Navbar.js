import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  NavLink
} from "react-router-dom";
import Register from "./Register";
import UserLogin from "./UserLogin";
import LoggedUser from './LoggedUser'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'
function Navbar() {
  let dispatch=useDispatch()
    let [usSuccess,setUsSuccess] = useState(false)
    const {usLoginSuccess} =useSelector((state)=>state.user)

    useEffect(()=>{
        console.log("usLoginSuccess",usLoginSuccess)
        const localUsSuccess=JSON.parse(localStorage.getItem("usLoginSuccess"))
        if(localUsSuccess ===true){
            setUsSuccess(true)
        }
        
    },[usLoginSuccess])

    const handleLogout = ()=>{
      localStorage.clear();
      setUsSuccess(false)
    }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-fixed navback">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="far fa-minus-square"></i>
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-2">
              {usSuccess ? (
                <>
                      <NavLink
                        className="btn nav-link "
                        to="/userlogin"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavLink>
                      <NavLink className='nav-link' to='/loggedUser'>Add Author/Books</NavLink>
                </>
              ) : (
                <>
                  {/* When not logged in */}
                  {/* Home bar */}
                  <NavLink to="/" className="nav-link HomeButton">
                    <i className="fas fa-home fa-2x"></i>
                  </NavLink>
                  {/* Dropdown for login/signup */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle text-dark"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      LOGIN/SIGNUP
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <NavLink to="/" className="nav-link">
                        <a className="dropdown-item" href="#">
                          Register
                        </a>
                      </NavLink>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <NavLink to="/userlogin" className="nav-link">
                        <a className="dropdown-item" href="#">
                          Login
                        </a>
                      </NavLink>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="userlogin" element={<UserLogin />}/>
          <Route path="loggedUser" element={<LoggedUser/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default Navbar;
