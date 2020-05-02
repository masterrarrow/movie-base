import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import 'url-search-params-polyfill';
import Movie from "./components/Movie";
import Loading from "./components/Loading";
import firebase from "./config/firebaseConfig";


const ITEMS_PER_PAGE = 20;
const PAGE_DISPLAY_RANGE = 5;


const Home = () => {
    // Initial data (displayed data)
    const [movies, setMovies] = useState([]);
    // Data is loaded
    const [loading, setLoading] = useState(false);
    // Get a search parameters from the url string
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get("search") || "";
    // Current page number
    const [page] = useState(parseInt(searchParams.get("page")) || 1);
    // Total movies count
    const [moviesCount, setMoviesCount] = useState(0);

    useEffect(() => {
        // While movie data is loading show the loading animation
        setLoading(true);
        getItems(q, page);
    }, [q, page]);

    const getItems = (search, currentPage) => {
        // Get all movies from the Firebase
        const db = firebase.firestore();
        // Return to cancel subscription on snapshot updates
        return db.collection("movies").onSnapshot(snapshot => {
            const data = [];
            snapshot.forEach(doc => {
                // Display only movies with a search string in title
                if (search !== "" && doc.data().title.toLowerCase().indexOf(search.toLowerCase()) === -1)
                    return;
                data.push({...doc.data(), id: doc.id})
            });
            setLoading(false);
            // Save total movies count
            setMoviesCount(data.length);

            // Pagination - Display only 10 movies per page
            let displayed = [];
            if (currentPage > 1) {
                // Next and prev page handling
                for (let i = currentPage + ITEMS_PER_PAGE - 2; i < currentPage * ITEMS_PER_PAGE; i++) {
                    if (data[i]) {
                        // Add only existing data
                        displayed.push(data[i]);
                    }
                }
                setMovies(displayed);
            } else if (data.length > ITEMS_PER_PAGE) {
                // First page handling
                for (let i = 0; i < ITEMS_PER_PAGE; i++) {
                    displayed.push(data[i]);
                }
                setMovies(displayed);
            } else {
                setMovies(data);
            }
        });
    };

    const handlePageChange = (pageNumber) => {
        // Set current page
        if (pageNumber === 1) {
            // First page is a base url
            window.location.search = "";
        } else {
            window.location.search = `?page=${pageNumber}`;
        }
    };

    console.log(movies);

    // Loading animation
    if (loading) return (<Loading/>);

    // Show all movies
    return (
        <header className="App-header">
            {/* Display search string */}
            { q ? <p className="search-results-text">Results for: "{q}"</p> : "" }
            <div className="row">
                {movies.map(movie =>
                    <div key={movie.id} className="col-auto">
                        <Movie movie={movie} link={true}/>
                        <div className="movie-title">{movie.title}</div>
                    </div>
                    )}
            </div>
            { moviesCount > ITEMS_PER_PAGE ?
            <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={page}
                itemsCountPerPage={ITEMS_PER_PAGE}
                totalItemsCount={moviesCount}
                pageRangeDisplayed={PAGE_DISPLAY_RANGE}
                onChange={(number) => handlePageChange(number)}
            /> : <></>}
      </header>
    )
};

export default Home;
