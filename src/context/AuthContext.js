import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";

// Stappenplan Context
// 1 AuthContext maken met create context
// 2 AuthContextProvider functie component bouwen met daarin:
    // Het echte AuthContext.Provider component
    // Geef een data object mee via de value={} property in de Provider
    // Stukje state, etc.
// 3 Wikkelen we de Provider om <App> heen in index.js

// Stappenplan Authenticatie

// 1 Bedenk welke data je in context beschikbaar moet stellen en bedenk daar een raamwerkje voor (login, logout, state)
// 2 maak de state aan en de lege functies:

// voorbeeld om mee te starten:
// // state voor de gebruikersdata (dit kun je beter userState noemen)
//     const [authState, setAuthState] = useState({
//         user: null,
//     });
//
// // inlogfunctie
// function login() {
//     console.log("login")
// }
// // uitlogfunctie
// function logout() {
//     console.log("logput")
// }
// 3 Plaats de state en functies in een data object en geeft die mee via de value={} prop
// 4 Test de context door een component aan te melden op de context met alles = useContext(AuthContext)
// 5 Inlogfunctie: geeft de JWTToken door aan de inlogfunctie en zet hem vanuit de provider in local storage
// 6 Redirect ook vanuit daar door naar de profielpagina
// onderstaande niet meer nodig
// Het proces van inloggen (JWT token in local storage zetten en gebruikersdata opslaan in de context) in de provider regelen



//  Uitlog functie: het proces van uitloggen (JWT token uit de local storage halen en context leeghalen)
//  implementeren dat bij refresh wordt gechecked of er nog een JWT token is en zo ja gebruikersdata ophalen.




export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const history = useHistory();

    // state voor de gebruikersdata (dit kun je beter userState noemen)
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });


    // fetch user data
    async function fetchUserData(jwtToken) {
        // console.log(jwtToken);
        // we hebben de JWT nodig om daaruit de user ID te halen
        // Hier gebruiken we de package jwt-docode van npm voor
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub;
        // console.log("DECODED JWT", decoded);

        // Gebruikersdata ophalen (axios, async, try catch, request maken)
        try {
            const result = await axios.get(`https://polar-lake-14365.herokuapp.com/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            // console.log(result);
            // Die data gebruiken om de context te vullen
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
        // console.log("login")
    }


    // wanneer de applicatie geladen wordt willen we checken of er een token is en als die er is maar er is geen gebruiker
    // dan willen we alsnog de gebruikersdata ophalen

    // na refresh gebeurd er dit:
    useEffect(() => {
        // is er een token in de localstorage?
        const token = localStorage.getItem("token");
        // is er GEEN user aanwezig in de context?
        if(token !== null && authState.user === null) {
            // haal dan de gebruikersdata op
            // console.log("er is een token")
            fetchUserData(token);

        } else {
            // zo nee, dan geen user, maar wel status op "done" zetten
            setAuthState({
                user: null,
                status: "done",
            })
        }
    },[]);

    // inlogfunctie
    async function login(jwtToken) {
        // console.log(jwtToken);
        // console.log("login")
        // JWT token in de local storage zetten
        localStorage.setItem("token", jwtToken);

        //Gebruikersdata ophalen
        fetchUserData(jwtToken);

        // Doorlinken naar de profielpagina.
        history.push("/search");
    }

    // uitlogfunctie
    function signOut() {
        console.log("logout")
        // leeghalen van de localstorage(met localStorage.clear()
        localStorage.clear();
        // user in de context weer op "null" zetten
        setAuthState ({
            user: null,
            status: "done",
        })
        history.push("/");
    }

    // dit mag je ook gelijk bij value hier onder zetten je krijgt dan dubbele accolades
    // Omdat authState een object is en we nog steeds gebruik willen maken van die automatische state updates zullen we de authState "spreadden". De puntjes zorgen er voor dat als er iets in de state veranderd dit ook meegaat naar het data object
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