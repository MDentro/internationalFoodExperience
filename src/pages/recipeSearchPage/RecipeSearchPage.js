import React, {useState, useEffect, useContext} from "react";
import SearchByUserInput from "../../components/searchByUserInput/SearchByUserInput";
import buildRecipeApiEndpoint from "../../helpers/buildRecipeApiEndpoint";
import axios from "axios";
import DisplayExistingSearchOptions from "../../components/displayExistingSearchOptions/DisplayExistingSearchOptions";
import Button from "../../components/buttons/button/Button";
import {AuthContext} from "../../context/AuthContext"
import styles from "./RecipeSearchPage.module.css";


function RecipeSearchPage() {
    const [meals, setMeals] = useState([]);
    const [endpoint, setEndpoint] = useState("");
    const [error, toggleError] = useState(false);
    const [errorMessage, toggleErrorMessage] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchBy, setSearchBy] = useState("");
    const [errorRadioButton, setErrorRadioButton] = useState("")
    const [errorInputField, setErrorInputField] = useState("");

    const {user} = useContext(AuthContext);

    useEffect(() => {
        setMeals("");
        toggleErrorMessage(false);
        toggleError(false);

        async function fetchData() {
            toggleError(false);
            toggleErrorMessage(false);
            toggleLoading(true);

            try {
                const {data: {meals}} = await axios.get(endpoint)

                if (meals) {
                    setMeals(meals);
                } else {
                    toggleError(true);
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


    function handleSearchForm(e) {
        setErrorRadioButton("");
        setErrorInputField("");
        e.preventDefault();
        if(!searchBy && !searchInput) {
            setErrorRadioButton("Please select category or origin.");
            setErrorInputField("Search input is obligated.");
        } else if(!searchBy) {
            setErrorRadioButton("Please select category or origin.");
        } else if(!searchInput) {
            setErrorInputField("Search input is obligated.");
        } else {
            setEndpoint(buildRecipeApiEndpoint("search", searchBy, searchInput, null));
            setSearchInput("");
            setErrorInputField("");
        }
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            handleSearchForm(e)
        }
    }

    function onChangeRadioButtonHandler(input) {
        setSearchBy(input);
        toggleError(false);
    }

    return (
        <div className={styles["search-container"]}>
            <article className={styles["introduction-text"]}>
                <h2>Dear {user && user.username}, what will you eat today?</h2>
                <p>Please search on category or origin</p>
            </article>

            <form className={styles.form} onSubmit={handleSearchForm}>

                <label
                    htmlFor="search-by-category"
                    className={styles["radio-button-title"]}
                >
                    <input
                        className={styles["radio-button-title"]}
                        type="radio"
                        id="search-by-category"
                        name="searchBy"
                        onChange={() => onChangeRadioButtonHandler("category")}
                    />
                    Search by category (example: pasta)
                </label>
                <label
                    htmlFor="search-by-origin"
                    className={styles["radio-button-title"]}
                >
                    <input
                        className={styles["radio-button-title"]}
                        type="radio"
                        id="search-by-origin"
                        name="searchBy"
                        onChange={() => onChangeRadioButtonHandler("origin")}
                    />
                    Search by origin (example: italian)
                    {errorRadioButton && <p className={styles.error}>{errorRadioButton}</p>}
                </label>


                <span className="searchbar">
                    <input
                        className={styles["search-bar"]}
                        type="text"
                        name="search"
                        id="recipe-search=bar"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyUp={keyPressCheck}
                        placeholder="Search for a recipe"
                    />
                    {errorInputField && <p className={styles.error}>{errorInputField}</p>}

                    <article className={styles["search-button"]}>
                        <Button
                            type="submit"
                        >
                            SEARCH
                        </Button>
                    </article>
            </span>
            </form>

            <SearchByUserInput meals={meals}/>
            {error && (
                <span className={styles.error}>
                            This {searchBy} doesn't exist. Please try {<DisplayExistingSearchOptions
                    searchBy={searchBy}/>}
                       </span>
            )}
            {errorMessage && <span className={styles.error}>Something went wrong with fetching the data, please try again later.</span>}
            {loading && <span>Loading...</span>}
        </div>
    );
}

export default RecipeSearchPage;