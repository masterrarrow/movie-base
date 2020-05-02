import React, { useContext, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from "../config/Auth";


const NavBar = () => {
    // Get user credentials
    const { currentUser } = useContext(AuthContext);

    // Get a search parameters from the url string
    const searchParams = new URLSearchParams(window.location.search);
    const searchStr = searchParams.get("search") || "";

    useEffect(() => {
        // Search field
        const input = document.getElementById("search");

        const searchForm = document.getElementById("search-form");
        searchForm.addEventListener("submit", (event) => {
            // Add a search parameter to the url
            window.location.search = `?search=${input.value}`;
            event.preventDefault();
        });
    }, [searchStr]);

    const mainLink = {
        color: "white",
        fontWeight:"bold",
    };

    const linkStyle = {
        color: "white"
    };

    let menu, information;
    if (currentUser) {
        // Visible only to a signed in users
        if (currentUser.emailVerified) {
            menu = (
                <>
                    <Link to="/new" className="dropdown-item">Add Movie</Link>
                    <div className="dropdown-divider"/>
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <div className="dropdown-divider"/>
                    <Link to="/sign-out" className="dropdown-item">Sign Out</Link>
                </>
            );
        } else {
            menu = (
                <>
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <div className="dropdown-divider"/>
                    <Link to="/sign-out" className="dropdown-item">Sign Out</Link>
                </>
            );
            information = (
                <NavLink className="nav-link text-warning" to="/information" style={linkStyle}>Information</NavLink>
            )
        }
    } else  {
        // Visible to a not signed in users
        menu = (
            <>
                <Link to="/sign-in" className="dropdown-item">Sign In</Link>
                <div className="dropdown-divider"/>
                <Link to="/sign-up" className="dropdown-item">Sign Up</Link>
            </>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light border-bottom">
            <NavLink to={"/"} className="navbar-brand" style={mainLink}>Movies</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/" style={linkStyle}>Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={linkStyle}>
                            Menu
                        </NavLink>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={linkStyle}>
                            {menu}
                        </div>
                    </li>
                    {information}
                </ul>
                <form id="search-form" className="form-inline my-2 my-lg-0">
                    <input className="search form-control mr-sm-2" id="search" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
};

export default NavBar;
