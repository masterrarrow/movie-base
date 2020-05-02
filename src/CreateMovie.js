import React, { useState, useEffect } from "react";
import firebase from "./config/firebaseConfig";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import { useForm } from "react-hook-form";


const CreateMovie = ({ match }) => {
    // Redirect to a home page after adding a new movie
    const [redirect, setRedirect] = useState(null);
    const [defaultValues, setDefaultValues] = useState({});
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        // submitData(match.params.slug);
        populateValues();
    }, [match.params.slug]);

    const populateValues = () => {
        // New movie
        if (!match.params.slug) return setDefaultValues({description: ""});

        // Get movie data
        const fetchData = async () => {
            const db = firebase.firestore();
            return await db.collection("movies").doc(match.params.slug).get();
        };
        fetchData().then(data => {
            const movie = { ...data.data(), id: match.params.slug };
            setDefaultValues({
                ...movie,
                genre: movie.genre.join(", "),
                stars: movie.stars.join(", "),
                countries: movie.countries.join(", ")
            });
        });
    };

    const onSubmit = (data) => {
        // Form submit
        const db = firebase.firestore();
        const fetchData = async () => {
            if (match.params.slug) {
                // User edited an existing movie
                Object.keys(data).forEach(function(key) {
                    // trim each value in data
                    this[key] = this[key].trim();
                }, data);
                return await db.collection("movies").doc(match.params.slug).set({
                    ...data,
                    genre: data.genre.trim().split(", "),
                    stars: data.stars.trim().split(", "),
                    countries: data.countries.trim().split(", "),
                    user: firebase.auth().currentUser.uid
                });
            }

            // Save new movie
            return await db.collection("movies").add({
                ...data,
                genre: data.genre.trim().split(", "),
                stars: data.stars.trim().split(", "),
                countries: data.countries.trim().split(", "),
                user: firebase.auth().currentUser.uid
            });
        };

        fetchData().then(data => {
            // Get movie id
            const id = match.params.slug ? match.params.slug : data.um.path.segments[1];
            // Redirect to a movie details page
            setRedirect(`/movie/${id}`);
            toast.success("Movie has been successfully saved!");
        }).catch(error => {
            console.log("ERROR:", error);
            toast.error("Something went wrong! Please try again later");
        });
    };

    const renderRedirect = () => {
        // If user add a new movie, go to the Home Page
        if (redirect) {
            return <Redirect to={redirect}/>
        }
    };

    return (
        <>
            {renderRedirect()}
            <main role="main" className="container new-movie">
                <div className="row justify-content-center">
                    <div className="col-md-11">
                        <div className="card">
                            <div className="card-body new-movie-card">
                                <form id="new-movie-form" onSubmit={handleSubmit(onSubmit)}>
                                    <fieldset className="form-group">
                                        <legend className="border-bottom mb-3">{match.params.slug ? "Edit Movie" : "New Movie"}</legend>
                                        <div className="form-group row">
                                            <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" name="title" id="inputTitle"
                                                       ref={register} defaultValue={defaultValues.title} placeholder="Title" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Genres</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" name="genre" id="inputAuthor"
                                                       ref={register} defaultValue={defaultValues.genre}
                                                       placeholder="Action, Sci-Fi, ..." required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Stars</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" name="stars" id="inputAuthor"
                                                       ref={register} defaultValue={defaultValues.stars} placeholder="Star, ..." required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Countries</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" name="countries" id="inputAuthor"
                                                       ref={register({required: true})} defaultValue={defaultValues.countries}
                                                       placeholder="Country, ..."/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputImage"
                                                   className="col-sm-2 col-form-label">Movie cover</label>
                                            <div className="col-sm-10">
                                                <input type="url" className="input-box form-control" name="cover" id="inputImage"
                                                       ref={register} defaultValue={defaultValues.cover} placeholder="Image url" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputImage"
                                                   className="col-sm-2 col-form-label">Video trailer</label>
                                            <div className="col-sm-10">
                                                <input type="url" className="input-box form-control" name="trailer"
                                                       ref={register} defaultValue={defaultValues.trailer} id="inputImage"
                                                       placeholder="YouTube video url" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPages"
                                                   className="col-sm-2 col-form-label">IMDB rating</label>
                                            <div className="col-sm-10">
                                                <input type="number" className="input-box form-control" name="imdb_rating"
                                                       ref={register} defaultValue={defaultValues.imdb_rating} id="inputPages"
                                                       placeholder="0.0" step="0.1" min="0" max="10" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Duration (min)</label>
                                            <div className="col-sm-10">
                                                <input type="number" className="input-box form-control" name="duration_min"
                                                       ref={register} defaultValue={defaultValues.duration_min} id="inputAuthor"
                                                       placeholder="0" min="1" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputDate"
                                                   className="col-sm-2 col-form-label">Release date</label>
                                            <div className="col-sm-10">
                                                <input type="date" className="input-box form-control" name="release" id="inputDate"
                                                       ref={register} defaultValue={defaultValues.release} required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputDescription"
                                                   className="col-sm-2 col-form-label">Movie description</label>
                                            <div className="col-sm-10">
                                                <textarea className="input-box form-control" rows="10" cols="45" name="description"
                                                       ref={register} defaultValue={defaultValues.description} id="inputDescription"
                                                          placeholder="Movie description" required/>
                                            </div>
                                        </div>
                                        <button type="reset" onClick={() => window.history.back()}
                                                className="btn btn-outline-danger float-left">Cancel</button>
                                        <button type="submit" className="btn btn-outline-success float-right">Save</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
};

export default CreateMovie;
