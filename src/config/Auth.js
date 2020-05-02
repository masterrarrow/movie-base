import React, { useEffect, useState } from "react";
import firebase from "./firebaseConfig";


// Authenticate user using Firebase
export const AuthContext = React.createContext(undefined, undefined);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};
