import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import RecipeDetailsPage from "./pages/recipeDetailsPage/RecipeDetailsPage";
import HomePage from "./pages/homePage/HomePage";
import RecipeSearchPage from "./pages/recipeSearchPage/RecipeSearchPage";
import DisplayExistingSearchOptions from "./components/displayExistingSearchOptions/DisplayExistingSearchOptions";
import RandomRecipeSearchPage from "./pages/randomRecipeSearchPage/RandomRecipeSearchPage";

function App() {
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

            <HomePage />
            <RecipeDetailsPage />

            <RandomRecipeSearchPage toggleErrorMessage={toggleErrorMessage} errorMessage={errorMessage}/>

            <RecipeSearchPage setSearchInputHandler={setQuery} setSearchByHandler={setChosenSearch} meals={meals} setEndpoint={setEndpoint}/>
            {error &&  (
                <span className="wrong-input-error">
                            This {chosenSearch} doesn't exist. Please try {<DisplayExistingSearchOptions
                    chosenSearch={chosenSearch}/>}
                       </span>
            )}
            {errorMessage && <span>Something went wrong with fetching the data, please try again later.</span>}
            {loading && <span>Loading...</span>}
        </>
    );
}

export default App;
