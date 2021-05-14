import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import axios from "axios";
import {
    Switch,
    Route, Redirect,
} from "react-router-dom";
import RecipeDetailsPage from "./pages/recipeDetailsPage/RecipeDetailsPage";
import HomePage from "./pages/homePage/HomePage";
import RecipeSearchPage from "./pages/recipeSearchPage/RecipeSearchPage";
import DisplayExistingSearchOptions from "./components/displayExistingSearchOptions/DisplayExistingSearchOptions";
import RandomRecipeSearchPage from "./pages/randomRecipeSearchPage/RandomRecipeSearchPage";
import SignInPage from "./pages/signInPage/SignInPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import Navigation from "./components/navigation/navigation"
import { AuthContext } from "./context/AuthContext"


function PrivateRoute({ children, user }) {
    console.log("dit is de user aan het begin en dit is null?", user)
    // omdat we nog steeds alle mogelijke properties zoals exact etc. op Route willen zetten, kunnen we met de ...rest operator zeggen:
    // al die andere props die je verder nog ontvangt, zet die ook allemaal maar op <Route>
    return (
        <Route>
            {user !== null ? children : <Redirect to="/" />}
            {console.log("dit is de user aan het begin2", user)}
        </Route>
    )
}

function App() {
    const {  user } = useContext(AuthContext);
    const [meals, setMeals] = useState([]);
    const [query, setQuery] = useState("");
    const [chosenSearch, setChosenSearch] = useState("");
    const [error, setError] = useState("");
    const [endpoint, setEndpoint] = useState("");
    const [errorMessage, toggleErrorMessage] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        setMeals("");

        async function fetchData() {
            setError("");
            toggleErrorMessage(false);
            toggleLoading(true);

            try {
                const {data: { meals }} = await axios.get(endpoint)

                if (meals) {
                    setMeals(meals);
                } else {
                    setError("error");
                }

            } catch (e) {
                console.error(e);
                toggleErrorMessage(true);
            }
            toggleLoading(false);
        }

        if (endpoint) {
            fetchData();
        }

    }, [endpoint]);


    return (
        <>
            <h1>International Food Experience</h1>
            <>
                <div>
                    <Navigation/>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route path="/signup">
                            <SignUpPage />
                        </Route>
                        <Route path="/signin" >
                            <SignInPage />
                        </Route>
                        {console.log("Hier is de waarde van user wel gevuld", user)}

                        <PrivateRoute path="/random-recipe" user={user}>
                            <RandomRecipeSearchPage />
                        </PrivateRoute>
                        <PrivateRoute path="/search" user={user}>
                            <RecipeSearchPage setSearchInputHandler={setQuery} setSearchByHandler={setChosenSearch} meals={meals} setEndpoint={setEndpoint}/>
                            {error &&  (
                                <span className="wrong-input-error">
                            This {chosenSearch} doesn't exist. Please try {<DisplayExistingSearchOptions
                                    chosenSearch={chosenSearch}/>}
                       </span>
                            )}
                        </PrivateRoute>
                        <Route path="/recipes/:idMeal">
                            <RecipeDetailsPage />
                        </Route>
                    </Switch>
                </div>
            </>



            {errorMessage && <span>Something went wrong with fetching the data, please try again later.</span>}
            {loading && <span>Loading...</span>}
        </>
    );
}

export default App;
