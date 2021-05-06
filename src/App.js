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

    useEffect(() => {
        setMeals("");
        setError("");


        async function fetchData() {
            try {
                const {data: { meals }} = await axios.get(endpoint)

                if (meals) {
                    setMeals(meals);
                } else {
                    setError("error");
                }

            } catch (e) {
                console.error(e);
            }
        }

        if (endpoint) {
            fetchData();
        }

    }, [endpoint]);

    return (
        <>

            <h1>International Food Experience</h1>

            <RandomRecipeSearchPage />

            {/*<RecipeSearchPage setSearchInputHandler={setQuery} setSearchByHandler={setChosenSearch} meals={meals} setEndpoint={setEndpoint}/>*/}
            {/*{error &&  (*/}
            {/*    <span className="wrong-input-error">*/}
            {/*                This {chosenSearch} doesn't exist. Please try {<DisplayExistingSearchOptions*/}
            {/*        chosenSearch={chosenSearch}/>}*/}
            {/*           </span>*/}
            {/*)}*/}
        </>
    );
}

export default App;
