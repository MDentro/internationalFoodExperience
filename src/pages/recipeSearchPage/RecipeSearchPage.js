import React, {useState, useEffect, useContext} from "react";
import SearchByUserInput from "../../components/searchByUserInput/SearchByUserInput";
import buildRecipeApiEndpoint from "../../helpers/buildRecipeApiEndpoint";
import axios from "axios";
import DisplayExistingSearchOptions from "../../components/displayExistingSearchOptions/DisplayExistingSearchOptions";
import Button from "../../components/buttons/button/Button";
import RadioButton from "../../components/buttons/radioButton/RadioButton";
import {AuthContext} from "../../context/AuthContext"
import styles from "./RecipeSearchPage.module.css";
import SearchBar from "../../components/searchBar/SearchBar";
import {ReactComponent as LoadingIcon} from "../../assets/spinner.svg";


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
        if (!searchBy && !searchInput) {
            setErrorRadioButton("Please select category or origin.");
            setErrorInputField("Search input is obligated.");
        } else if (!searchBy) {
            setErrorRadioButton("Please select category or origin.");
        } else if (!searchInput) {
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
                <RadioButton
                    label="search-by-category"
                    type="radio"
                    id="search-by-category"
                    name="searchBy"
                    onChange={() => onChangeRadioButtonHandler("category")}
                >
                    Search by category (example: pasta)
                </RadioButton>

                <RadioButton
                    label="search-by-origin"
                    type="radio"
                    id="search-by-origin"
                    name="searchBy"
                    onChange={() => onChangeRadioButtonHandler("origin")}
                >
                    Search by origin (example: italian)
                    {errorRadioButton && <p className={styles["error-radio"]}>{errorRadioButton}</p>}
                </RadioButton>

                <span className="searchbar">
                <SearchBar
                    type="text"
                    name="search"
                    id="recipe-search=bar"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={keyPressCheck}
                    placeholder="Search for a recipe"

                />
                    {errorInputField && <p className={styles["error-input-field"]}>{errorInputField}</p>}

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
            {errorMessage &&
            <span className={styles.error}>Something went wrong with fetching the data, please try again later.</span>}
            {loading && <LoadingIcon className={styles.loading}/>}
        </div>
    );
}

export default RecipeSearchPage;