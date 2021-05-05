import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import RecipeDetailsPage from "./pages/recipeDetailsPage/RecipeDetailsPage";
import HomePage from "./pages/homePage/HomePage";
import RecipeSearchPage from "./pages/recipeSearchPage/RecipeSearchPage";
import DisplayExistingSearchOptions from "./components/displayExistingSearchOptions/DisplayExistingSearchOptions";

function App() {
    const [meals, setMeals] = useState([]);
    const [query, setQuery] = useState("");
    const [chosenSearch, setChosenSearch] = useState("");
    const [errorCategory, setErrorCategory] = useState("");
    const [errorOrigin, setErrorOrigin] = useState("");


    useEffect(() => {
        setMeals("");
        setErrorCategory("");
        setErrorOrigin("");

        async function fetchData() {
            try {
                if (chosenSearch === "category") {
                    const {data: { meals }} = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`)
                    if (!meals) {
                        setErrorCategory("error");
                    } else {
                        setMeals(meals);
                    }
                }

                if (chosenSearch === "origin") {
                    const {data: { meals }} = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`)
                    if (!meals) {
                        setErrorOrigin("error");
                    } else {
                        setMeals(meals);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }

        if (query) {
            fetchData();
        }

    }, [query, chosenSearch]);

    return (
        <>
            <h1>International Food Experience</h1>
            {/* <RecipeDetailsPage/>*/}
            <HomePage />

            <RecipeSearchPage setSearchInputHandler={setQuery} setSearchByHandler={setChosenSearch} meals={meals}/>
            {errorCategory && (
                <span className="wrong-input-error">
                            This category doesn't exist. Please try {<DisplayExistingSearchOptions
                    chosenSearch="category"/>}
                       </span>
            )}

            {errorOrigin && (
                <span className="wrong-input-error">
                            This origin doesn't exist. Please try {<DisplayExistingSearchOptions
                    chosenSearch="origin"/>}
                       </span>
            )}
        </>
    );
}

export default App;
