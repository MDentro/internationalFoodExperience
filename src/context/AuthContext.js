import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";
import buildUserApiEndpoint from "../helpers/buildUserApiEndpoint";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const history = useHistory();
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });
    //TODO
    // const [exp, setExp] = useState("");

    async function fetchUserData(jwtToken) {
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub;

        try {
            const result = await axios.get(buildUserApiEndpoint(false, false, true), {
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


    // TODO
    // function automaticSignOut() {
    //     const now = new Date();
    //     const epochTimeNow = now.getTime();
    //
    //     if(epochTimeNow > decoded.exp) {
    //         localStorage.clear();
    //         setAuthState ({
    //             user: null,
    //             status: "done",
    //         })
    //     }
    // }


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