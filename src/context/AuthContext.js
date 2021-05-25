import React, {createContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";
import buildUserApiEndpoint from "../helpers/buildUserApiEndpoint";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const history = useHistory();
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });

// //TODO
//     function tokenValidation(token, tokenExpired) {
//         const now = new Date();
//         const epochTimeNow = now.getTime();
//         if (epochTimeNow > tokenExpired * 1000) {
//             localStorage.clear();
//             setAuthState ({
//                 user: null,
//                 status: "done",
//             })
//         }
//     }
//     //


    async function fetchUserData(jwtToken) {
        // const decoded = jwt_decode(jwtToken);
        // const userId = decoded.sub;
        // const exp = decoded.exp;
        // console.log(exp);
        // console.log(jwtToken);

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
        const tokenExpires = localStorage.getItem("tokenExpires");
        const now = new Date();
        const epochTimeNow = now.getTime()

        if (epochTimeNow > tokenExpires * 1000) {
            localStorage.clear();
            setAuthState({
                user: null,
                status: "done",
            })
        } else if (token !== null && authState.user === null) {
            fetchUserData(token);
        } else {
            setAuthState({
                user: null,
                status: "done",
            })
        }
    }, []);

    async function login(jwtToken) {
        const decoded = jwt_decode(jwtToken);
        const exp = decoded.exp;

        localStorage.setItem("token", jwtToken);
        localStorage.setItem("tokenExpires", exp);
        fetchUserData(jwtToken);
        history.push("/search");
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