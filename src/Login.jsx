import './Login.css';
import { Link, useNavigate } from 'react-router';
import {useRef} from 'react';
import {auth} from './assets/config/firebase';
import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();

    const passwordRef = useRef(null);
    const emailRef = useRef(null);

    const [users, setUsers] = useState([]);
    const [specificUser, setSpecificUser] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null); // To store the authenticated Firebase user

    // Effect to listen for Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setLoggedInUser(user);
                console.log("Firebase authenticated user:", user.email);
            } else {
                // User is signed out
                setLoggedInUser(null);
                setSpecificUser(null); // Clear specific user if logged out
                console.log("No Firebase user is signed in.");
            }
        });

        // Clean up the subscription
        return () => unsubscribe();
    }, []);

    // Effect to fetch all users and then find the specific user from your database
    // This runs whenever `loggedInUser` changes and is not null
    useEffect(() => {
        if (loggedInUser) {
            fetch("http://localhost:5000/users")
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setUsers(data); // Store all users if needed elsewhere
                    const foundUser = data.find(dbUser => dbUser.email === loggedInUser.email);
                    if (foundUser) {
                        setSpecificUser(foundUser);
                        console.log("Found user in DB:", foundUser.name, foundUser.role);
                        console.log("Successfully logged in and user found in DB!!");
                        console.log("Role: " + foundUser.role);
                        
                    } else {
                        console.log("User email from Firebase not found in your database.");
                        setSpecificUser(null); // User not found in your DB
                    }
                })
                .catch(err => console.error("Failed to fetch users or find specific user:", err));
        }
    }, [loggedInUser]); // Dependency array: runs when loggedInUser changes

    
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setLoggedInUser(user);
                console.log("Google sign-in successful (popup result).");
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                //const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorMessage)
            });
        }

        function passwordLogin(){
            const password = passwordRef.current.value;
            const email = emailRef.current.value;
            console.log("password: "+password)
            console.log("email: "+email)
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                setLoggedInUser(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode+":"+errorMessage)
            });
        
        }
 
    return (  
        <div className="login-container">
        <div className="login-header">
            <div className="brand-name">Kayarents</div>
            <div className="brand-tagline">Welcome back to your backroom stays</div>
        </div>
        
        <form className="login-form" id="loginForm">
            <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input ref={ emailRef }type="email" id="email" className="form-input" placeholder="Enter your email" required/>
            </div>
            
            <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input ref={ passwordRef } type="password" id="password" className="form-input" placeholder="Enter your password" required/>
                <span className="password-toggle" >👁️</span>
                <div className="forgot-password">
                    <a href="#" >Forgot Password?</a>
                </div>
            </div>
            
            <Link className='login-link' onClick={ passwordLogin }>Sign In</Link>
            
            <div className="divider">
                <span>or continue with</span>
            </div>
            
            <div className="social-login">
                <button type="button" className="social-btn google-btn" onClick={ googleSignIn } >
                </button>
            </div>
            
            <div className="signup-link">
                Don't have an account? <a href="#">Sign up here</a>
            </div>
        </form>
    </div>
    );
}
 
export default Login