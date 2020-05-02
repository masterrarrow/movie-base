import React from 'react';
import { Link } from 'react-router-dom';
import ErrorImage from './pict/ripped.jpg';


const Error404 = () => {
    // Error page
    return (
        <div>
            <h2 className="error text-danger">Something went wrong!</h2>
            <img src={ErrorImage} alt="404"/>
            <p style={{textAlign:"center"}}>
                <Link to="/">
                    <h5>Home Page</h5>
                </Link>
            </p>
        </div>
    )
};

export default Error404;
