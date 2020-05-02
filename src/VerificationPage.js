import React, {useContext, useEffect, useState} from "react";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import firebase from "./config/firebaseConfig";
import { AuthContext } from "./config/Auth";


const VerificationPage = () => {
    const { currentUser } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // Redirect to the Home page if user email already verified
        if (currentUser && currentUser.emailVerified)
            setRedirect(currentUser);
        // or if user did not logged in
        if (!currentUser)
            setRedirect(true);
    }, [currentUser]);

    const resendEmail = (event) => {
        event.preventDefault();
        firebase.auth().currentUser.sendEmailVerification().then(() => {
            // Email has been sent
            toast.success("Verification email has been sent! Check your email");
            setRedirect(true);
        }).catch((e) => toast.error("Something went wrong! Please try again later"));
    };

    const renderRedirect = () => {
        // Go to the Home Page
        if (redirect) {
            return <Redirect to="/"/>
        }
    };

    return (
        <>
            {renderRedirect()}
            <main role="main" className="container sign-in">
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-body sing-in-card">
                                <form id="sign-in-form">
                                    <fieldset className="form-group">
                                        <legend className="legend border-bottom mb-4">Information</legend>
                                        <div className="input-group mb-4" style={{fontSize: "medium"}}>
                                            <p>To gain full access to this website you need to confirm your registration email.</p>
                                            <br/>
                                            <p>Instructions have been sent to you during the registration process.</p>
                                        </div>
                                        <button type="reset" onClick={() => window.history.back()}
                                                className="btn btn-outline-info float-right">OK</button>
                                        <p className="text-muted">Did not receive an email?
                                            <button className="btn card-link text-info" style={{fontSize: "small"}}
                                                    onClick={(e) => resendEmail(e)}>Resend email</button>
                                        </p>
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

export default VerificationPage;
