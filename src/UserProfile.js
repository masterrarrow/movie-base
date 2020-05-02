import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom"
import { toast } from "react-toastify";
import { AuthContext } from "./config/Auth";
import { useForm } from "react-hook-form";
import firebase, { storage } from "./config/firebaseConfig";


const UserProfile = () => {
    // Get user credentials
    const { currentUser } = useContext(AuthContext);
    // Default user data before changes
    const [defaultValues, setDefaultValues] = useState({});
    const { register, handleSubmit } = useForm();
    // User profile data has not been changed
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        getProfile();
    }, [updated]);

    const getProfile = () => {
        // Get user profile
        try {
            const profileData = firebase.auth().currentUser.providerData[0];
            storage.ref().child(profileData.photoURL).getDownloadURL().then((value) => {
                setDefaultValues({
                    ...profileData,
                    photo: value
                });
                setUpdated(false);
            });
        } catch (e) {
            // If error, go to the Home page
            return <Redirect to="/"/>
        }
    };

    const onSubmit = (data) => {
        // Submit data
        let user = firebase.auth().currentUser;

        if (data.picture.length > 0) {
            // Store profile picture to the Storage
            let pictureRef = storage.ref().child("profiles").child(data.picture[0].name);
            pictureRef.put(data.picture[0]).then(() => {
                // Update profile picture in the Firestore
                user.updateProfile({
                    photoURL: `profiles/${data.picture[0].name}`
                }).then(() => {
                    setUpdated(true);
                    toast.success("Your profile has been updated");
                });
            }).catch(() => {
                toast.error("Something went wrong! Please try again later");
            })
        }
        if (data.displayName !== defaultValues.displayName) {
            // Update user name
            user.updateProfile({
                displayName: data.displayName
            }).then(() => {
                setUpdated(true);
                toast.success("Your profile has been updated");
            });
        }
        if (data.email !== defaultValues.email) {
            // Update user email
            let password = (window.prompt("Enter your password"));
            if (password) {
                // Re-authenticate a user
                firebase.auth().signInWithEmailAndPassword(defaultValues.email, password).then(() => {
                    // Send verification email
                    user.verifyBeforeUpdateEmail(data.email).then(async () => {
                        setUpdated(true);
                        toast.success("To complete changes check your email and follow the instructions");
                    });
                }).catch(() => {
                    toast.error("Something went wrong! Please try again later");
                });
            }
        }
    };

    const deleteAccount = () => {
        // Ask user to confirm deletion
        let password = (window.prompt("Enter your password to confirm the deletion"));
        if (password) {
            // Re-authenticate a user
            firebase.auth().signInWithEmailAndPassword(defaultValues.email, "arrow159753").then(() => {
                // Delete user account
                firebase.auth().currentUser.delete().then(() => {
                    toast.info("Your account has been deleted");
                }).catch(() => {
                    toast.error("Something went wrong! Please try again later");
                });
            });
        }
    };

    const renderRedirect = () => {
        // If user deleted account, go to the Home Page
        if(!currentUser) {
            return <Redirect to="/"/>
        }
    };

    return (
        <>
            {renderRedirect()}
            <div className="card col-md-5 profile">
                <legend className="legend border-bottom mt-2 mb-4">Profile</legend>
                <div className="media">
                    <img className="rounded-circle ml-4" src={defaultValues.photo} height="68" alt="..."/>
                        <div className="media-body">
                            <h2 className="account-heading ml-3">{defaultValues.displayName}</h2>
                            <p className="text-secondary ml-3">{defaultValues.email}</p>
                        </div>
                    <button className="btn btn-outline-danger float-right mr-4" onClick={deleteAccount}>Delete Account</button>
                </div>
                <div className="card-body">
                    <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input name="displayName" type="text" className="form-control" id="inputUsername"
                                   aria-describedby="nameHelp" placeholder="Username"
                                   ref={register} defaultValue={defaultValues.displayName}/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input name="email" type="email" className="form-control" id="inputEmail"
                                   aria-describedby="emailHelp" placeholder="Email"
                                   ref={register} defaultValue={defaultValues.email}/>
                        </div>
                            <label className="mt-2">Profile picture</label>
                            <p><input type="file" accept="image/*" className="text-muted" id="user_image"
                                      name="picture" ref={register}/></p>
                        <div className="form-group mb-1">
                            <button type="submit" className="btn btn-outline-success float-right mt-3">Update</button>
                            <button type="reset" onClick={() => window.history.back()}
                                    className="btn btn-outline-info float-left mt-3">Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default UserProfile;
