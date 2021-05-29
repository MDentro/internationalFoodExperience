import React, {createContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";
import buildUserUrlEndpoint from "../helpers/buildUserUrlEndpoint";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const history = useHistory();
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });


    async function fetchUserData(jwtToken) {
        try {
            const result = await axios.get(buildUserUrlEndpoint(false, false, true), {
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
        const now = new Date();
        const epochTimeNow = now.getTime()

        if (token !== null && authState.user === null) {
            const decoded = jwt_decode(token);
            const tokenExpires = decoded.exp;
            if (epochTimeNow < tokenExpires * 1000) {
                fetchUserData(token);
            } else if (epochTimeNow >= tokenExpires * 1000) {
                localStorage.clear();
                setAuthState({
                    user: null,
                    status: "done",
                })
            }
        } else {
            setAuthState({
                user: null,
                status: "done",
            })
        }
    }, []);

    async function login(jwtToken) {
        localStorage.setItem("token", jwtToken);
        await fetchUserData(jwtToken);
    }

    function signOut() {
        localStorage.clear();
        setAuthState({
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