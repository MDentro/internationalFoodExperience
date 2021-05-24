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
    //TODO
    //  const [exp, setExp] = useState("");
    // const exp = "";


    // function fetchAuthUserData(jwtToken) {
    //     const decoded = jwt_decode(jwtToken);
    //     console.log("dit is een test")
    //     const expiredToken = decoded.exp * 1000;
    //
    //     console.log(expiredToken);
    //     const now = new Date();
    //     const epochTimeNow = now.getTime();
    //     console.log("wordt dit geprint voor if statement", "time", epochTimeNow, "expired", expiredToken);
    //     if (epochTimeNow > expiredToken) {
    //         console.log("wordt dit geprint in if statement", "time", epochTimeNow, "expired", expiredToken);
    //         localStorage.clear();
    //         setAuthState({
    //             user: null,
    //             status: "done",
    //         })
    //     }
    //     else {
    //         fetchUserData(jwtToken);
    //     }
    // }

    async function fetchUserData(jwtToken, exp) {
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub;
        // setExp(decoded.exp);
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
        if (token !== null && authState.user === null) {
            fetchUserData(token);
        } else {
            setAuthState({
                user: null,
                status: "done",
            })
        }
    }, []);

    async function login(jwtToken) {
        localStorage.setItem("token", jwtToken);
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


    // //TODO
    // function automaticSignOut() {
    //     fetchUserData(exp)
    //     const now = new Date();
    //     const epochTimeNow = now.getTime();
    //     console.log("wat is dit", exp);
    //
    //     // if(epochTimeNow > exp) {
    //     //     localStorage.clear();
    //     //     setAuthState ({
    //     //         user: null,
    //     //         status: "done",
    //     //     })
    //     // }
    // }


    const data = {
        ...authState,
        login: login,
        signOut: signOut,
        // automaticSignOut: automaticSignOut,
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