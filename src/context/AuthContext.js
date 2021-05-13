import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const history = useHistory();
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });

    async function fetchUserData(jwtToken) {
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub;

        try {
            const result = await axios.get(`https://polar-lake-14365.herokuapp.com/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            setAuthState({
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: "done",
            });
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token !== null && authState.user === null) {
            fetchUserData(token);
        } else {
            setAuthState({
                user: null,
                status: "done",
            })
        }
    },[]);

    async function login(jwtToken) {
        localStorage.setItem("token", jwtToken);
        fetchUserData(jwtToken);
        history.push("/search");
    }

    function signOut() {
        console.log("logout")
        localStorage.clear();
        setAuthState ({
            user: null,
            status: "done",
        })
        history.push("/");
    }

    const data = {
        ...authState,
        login: login,
        signOut: signOut,
    }

    return (
        <>
        <AuthContext.Provider value={data}>
            {authState.status === "done"
                ? children
                : <p>Loading...</p>
            }
        </AuthContext.Provider>
        </>
    );
}

export default AuthContextProvider;