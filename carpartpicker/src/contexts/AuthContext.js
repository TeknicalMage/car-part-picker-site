import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import 'firebase/storage';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(function(user) {
                if (user && user.emailVerified === false) {
                    user.sendEmailVerification().then(function() {
                        console.log("email verification sent to user");
                    });
                }
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode, errorMessage);
            });
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updatePhotoUrl(photoUrl) {
        return currentUser.updatePhotoUrl(photoUrl)
    }

    function updatePhoneNumber(phoneNumber) {
        return currentUser.updatePhoneNumber(phoneNumber)
    }

    function updateDisplayName(displayName) {
        return currentUser.updateDisplayName(displayName)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
                // console.log(user)
            setLoading(false)
                // if (user && !user.emailVerified) {
                //   console.log("inside of sendEmailVerification");
                // }
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updatePhoneNumber,
        updateDisplayName,
    }

    return ( <
        AuthContext.Provider value = { value } > {!loading && children } <
        /AuthContext.Provider>
    )
}