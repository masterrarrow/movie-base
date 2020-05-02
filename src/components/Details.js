import React from "react";
import Moment from "moment";


const Details = ({ movie }) => {
    const clipText = (text, len) => {
        if (text.length > len) {
            return text.substr(0, len) + "..."
        } else {
            return text;
        }
    };

    return (
        <div className="movie-tooltip">
            <div className="row">
                <h6 className="title ml-4 mt-1">{clipText(movie.title, 22)}</h6>
                <h5 className="mt-2 ml-3" style={{color: "grey"}}>
                    {Moment(movie.release).format("YYYY")}
                </h5>
            </div>
            <div className="row">
                <span className="rating mr-1 ml-4">IMDb</span>
                {movie.imdb_rating}
                <svg className="bi bi-alarm mr-2 ml-3 mb-3" width="1em" height="1em" viewBox="0 0 16 16"
                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 15A6 6 0 108 3a6 6 0 000 12zm0 1A7 7 0 108 2a7 7 0 000 14z"
                        clip-rule="evenodd"/>
                  <path fill-rule="evenodd"
                        d="M8 4.5a.5.5 0 01.5.5v4a.5.5 0 01-.053.224l-1.5 3a.5.5 0 11-.894-.448L7.5 8.882V5a.5.5 0 01.5-.5z"
                        clip-rule="evenodd"/>
                  <path
                      d="M.86 5.387A2.5 2.5 0 114.387 1.86 8.035 8.035 0 00.86 5.387zM11.613 1.86a2.5 2.5 0 113.527 3.527 8.035 8.035 0 00-3.527-3.527z"/>
                  <path fill-rule="evenodd"
                        d="M11.646 14.146a.5.5 0 01.708 0l1 1a.5.5 0 01-.708.708l-1-1a.5.5 0 010-.708zm-7.292 0a.5.5 0 00-.708 0l-1 1a.5.5 0 00.708.708l1-1a.5.5 0 000-.708zM5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z"
                        clip-rule="evenodd"/>
                  <path d="M7 1h2v2H7V1z"/>
                </svg>
                {movie.duration_min} min
            </div>
            <div className="description">
                {clipText(movie.description, 230)}
            </div>
            <div className="text mt-3">
                Country:
                <span className="ml-1" style={{color: "rgb(0, 152, 205)"}}>
                    {clipText(movie.countries.join(", "), 45)}
                </span>
            </div>
            <div className="text">
                Genre:
                <span className="ml-1" style={{color: "rgb(15,205,140)"}}>
                    {clipText(movie.genre.join(", "), 45)}
                </span>
            </div>
            <div className="text">
                Stars:
                <span className="ml-1" style={{fontWeight: "bold"}}>
                    {clipText(movie.stars.join(", "), 45)}
                </span>
            </div>
        </div>
    )
};

export default Details;
