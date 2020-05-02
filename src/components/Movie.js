import React from 'react';
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Details from "./Details";
import './Movie.css'


const Movie = ({ movie, link }) => {
    if (link) {
        // Home page
        return (
            <Tooltip enterDelay={500} leaveDelay={200} placement="right-end" title={(
                <Details movie={movie}/>
            )}>
                <Link to={`/movie/${movie.id}`} className="movie-card card">
                    <img className="card-img-top" height="430" src={movie.cover} alt={movie.title}/>
                </Link>
            </Tooltip>
        );
    } else {
        // Movie details page
        return (
            <img className="styled-card card" height="430" src={movie.cover} alt={movie.title}/>
        );
    }
};

export default React.memo(Movie);
