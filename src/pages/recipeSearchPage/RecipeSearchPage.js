import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SearchByUserInput from "../../components/searchByUserInput/SearchByUserInput";
import buildRecipeApiEndpoint from "../../helpers/buildRecipeApiEndpoint";
import axios from "axios";
import DisplayExistingSearchOptions from "../../components/displayExistingSearchOptions/DisplayExistingSearchOptions";
import Button from "../../components/buttons/Button/Button";


function RecipeSearchPage() {
    const [meals, setMeals] = useState([]);
    const [error, toggleError] = useState(false);
    const [endpoint, setEndpoint] = useState("");
    const [errorMessage, toggleErrorMessage] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchBy, setSearchBy] = useState("");

    const { handleSubmit, register, formState: {errors} } = useForm();

    useEffect(() => {
        setMeals("");
        toggleErrorMessage(false);
        toggleError(false);

        async function fetchData() {
            toggleError(false);
            toggleErrorMessage(false);
            toggleLoading(true);

            try {
                const {data: { meals }} = await axios.get(endpoint)

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
        setSearchInput( "");
    }

    function onSubmit() {
        handleUserInput()
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            handleUserInput()
        }
    }
    console.log("searchBy", searchBy)

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="search-by-category">
                    <input
                        type="radio"
                        id="search-by-category"
                        name="searchBy"
                        {...register("searchBy", {required: true})}
                        onChange={() => setSearchBy("category")}
                    />
                    Search by category (example: pasta);
                </label>
                <label htmlFor="search-by-origin">
                    <input
                        type="radio"
                        id="search-by-origin"
                        name="searchBy"
                        {...register("searchBy", {required: true})}
                        onChange={() => setSearchBy("origin")}
                    />
                    Search by origin (example: italian);
                    {errors.searchBy && <p className="error">You must select category or origin.</p>}
                </label>


                <span className="searchbar">
                    <input
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

                <Button
                    type="submit"
                >
                   SEARCH
                </Button>

            </span>
         </form>

            <SearchByUserInput meals={meals}/>
            {error &&  (
                <span className="wrong-input-error">
                            This {searchBy} doesn't exist. Please try {<DisplayExistingSearchOptions
                    searchBy={searchBy}/>}
                       </span>
            )}

            {errorMessage && <span>Something went wrong with fetching the data, please try again later.</span>}
            {loading && <span>Loading...</span>}
        </>
    );
}

export default RecipeSearchPage;