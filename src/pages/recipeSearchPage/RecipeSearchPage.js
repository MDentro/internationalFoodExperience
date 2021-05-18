import React, {useState, useEffect, useContext} from "react";
import {useForm} from "react-hook-form";
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

    const {handleSubmit, register, formState: {errors}} = useForm({reValidateMode: 'onChange'});

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


    function handleUserInput() {
        setEndpoint(buildRecipeApiEndpoint("search", searchBy, searchInput, null));
        setSearchInput("");
    }

    function onSubmit() {
        handleUserInput()
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            handleUserInput()
        }
    }

    function onChangeRadioButtonHandler(input) {
        setSearchBy(input);
        toggleError(false)
        errors.search = null;
    }

    return (
        <div className={styles["search-container"]}>
            <article className={styles["introduction-text"]}>
                <h2>Dear {user && user.username}, what will you eat today?</h2>
                <p>Please search on category or origin</p>
            </article>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <label
                    htmlFor="search-by-category"
                    className={styles["radio-button-title"]}
                >
                    <input
                        className={styles["radio-button-title"]}
                        type="radio"
                        id="search-by-category"
                        name="searchBy"
                        {...register("searchBy", {required: true})}
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
                        {...register("searchBy", {required: true})}
                        onChange={() => onChangeRadioButtonHandler("origin")}
                    />
                    Search by origin (example: italian)
                    {errors.searchBy && <p className="error">You must select category or origin.</p>}
                </label>


                <span className="searchbar">
                    <input
                        className={styles["search-bar"]}
                        type="text"
                        name="search"
                        id="recipe-search=bar"
                        {...register("search", {required: true})}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyUp={keyPressCheck}
                        placeholder="Search for a recipe"
                    />
                    {console.log("wat is errors?", errors)}
                    {console.log("wat is errorsSearch?", errors.search)}
                    {errors.search && <p className="error">Search input is obligated.</p>}

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
                <span className="wrong-input-error">
                            This {searchBy} doesn't exist. Please try {<DisplayExistingSearchOptions
                    searchBy={searchBy}/>}
                       </span>
            )}
            {errorMessage && <span>Something went wrong with fetching the data, please try again later.</span>}
            {loading && <span>Loading...</span>}
        </div>
    );
}

export default RecipeSearchPage;