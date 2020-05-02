import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "react-router";
import './App.css';
import { AuthContext } from "./config/Auth";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Home from "./Home";
import MovieDetails from "./MovieDetails";
import CreateMovie from "./CreateMovie";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import Error404 from "./Error404";
import VerificationPage from "./VerificationPage";
import RequestResetPassword from "./RequestResetPassword";
import UserProfile from "./UserProfile";


function App() {
    // Get user credentials
    const { currentUser } = useContext(AuthContext);

    // Configure toast notifications
    toast.configure({
        autoClose: 5000,
        pauseOnFocusLoss: false
    });

    return (
        <Router component={App}>
            <div className="App">
              <NavBar/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/movie/:slug" component={MovieDetails}/>
                    <PrivateRoute path="/new" exact component={CreateMovie}/>
                    <PrivateRoute path="/new/:slug" exact component={CreateMovie}/>
                    <Route path="/sign-in" render={() => currentUser ? <Redirect to="/"/> : <SignIn/>}/>
                    <Route path="/sign-up" render={() => currentUser ? <Redirect to="/"/> : <SignUp/>}/>
                    <Route path="/sign-out" render={() => (currentUser === false) ? <Redirect to="/"/> : <SignOut/>}/>
                    <Route path="/information" component={VerificationPage}/>
                    <Route path="/reset-password" component={RequestResetPassword}/>
                    <Route path="/profile" component={UserProfile}/>
                    <Route path="*" component={Error404}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
