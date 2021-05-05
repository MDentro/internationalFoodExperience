import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SearchByUserInput from "../../components/searchByUserInput/SearchByUserInput";
import SubmitButton from "../../components/buttons/submitButton/SubmitButton";

function RecipeSearchPage({ setSearchInputHandler, setSearchByHandler, meals, setEndpoint }) {
    const [searchInput, setSearchInput] = useState("");
    const [searchBy, setSearchBy] = useState("");

    const { handleSubmit, register, formState: {errors} } = useForm();

    function onSubmit() {
        setSearchInputHandler(searchInput);
        setSearchByHandler(searchBy);

        let endpoint = "";
        if (searchBy === "category") {
           endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`;
        } else if (searchBy === "origin") {
           endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchInput}`;
        }
        setEndpoint(endpoint);

        handleClear();
        // errors.search = "";
    }

    const handleClear = () => {
        setSearchInput( "");
    };

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setSearchInputHandler(searchInput);
            setSearchByHandler(searchBy);

            let endpoint = "";
            if (searchBy === "category") {
                endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`;
            } else if (searchBy === "origin") {
                endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchInput}`;
            }
            setEndpoint(endpoint);

            handleClear();
            errors.search = "";
        }
    }

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
                    {errors.search && <p className="error">Search input is obligated.</p>}

                <SubmitButton>
                   SEARCH
                </SubmitButton>

            </span>
         </form>

            <SearchByUserInput meals={meals}/>
        </>
    );
}

export default RecipeSearchPage;