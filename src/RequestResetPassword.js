import React, { useContext, useState } from "react";
import { Redirect } from 'react-router-dom';
import { toast } from "react-toastify";
import { AuthContext } from "./config/Auth";
import firebase from "./config/firebaseConfig";


const RequestResetPassword = () => {
    // Get user credentials
    const { currentUser } = useContext(AuthContext);
    const [redirect, setRedirect] = useState("/" ? currentUser : null);
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        // Form submit
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            // Redirect user to the sign in page
            setRedirect("/sign-in");
            toast.success("Please check your email and follow the instructions");
        }).catch((e) => {
            toast.error("Something went wrong! Please ty again later");
        });
        event.preventDefault();
    };

    const handleChange = (event) => {
        // Set new value
        setEmail(event.target.value)
    };

    const renderRedirect = () => {
        // Redirect user
        if (redirect) {
            return <Redirect to={redirect}/>
        }
    };

    return (
        <>
            {renderRedirect()}
            <div className="logout col-md-12">
                <form id="reset-form" onSubmit={handleSubmit}>
                    <h2 className="legend logout-text mb-4">Reset password</h2>
                    <div className="text-box input-group mb-4" style={{width: "25rem"}}>
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <svg className="bi bi-envelope-fill" width="1em" height="1em"
                                     viewBox="0 0 16 16" fill="currentColor"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M.05 3.555L8 8.414l7.95-4.859A2 2 0 0014 2H2A2 2 0 00.05 3.555zM16 4.697l-5.875 3.59L16 11.743V4.697zm-.168 8.108L9.157 8.879 8 9.586l-1.157-.707-6.675 3.926A2 2 0 002 14h12a2 2 0 001.832-1.195zM0 11.743l5.875-3.456L0 4.697v7.046z"/>
                                </svg>
                            </span>
                        </div>
                        <input type="email" name="email" className="form-control" placeholder="Email"
                               value={email} onChange={handleChange} id="inputEmail" aria-label="Email" required/>
                    </div>
                    <div>
                        <button onClick={() => window.history.back()}
                                className="btn btn-outline-secondary mr-3">Cancel</button>
                        <button type="submit" className="btn btn-outline-success">Reset</button>
                    </div>
                </form>
            </div>
        </>
    )
};

export default RequestResetPassword;
