import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SearchByUserInput from "../../components/searchByUserInput/SearchByUserInput";
import SubmitButton from "../../components/buttons/submitButton/SubmitButton";
import buildEndpoint from "../../helpers/buildEndpoint";

function RecipeSearchPage({ setSearchInputHandler, setSearchByHandler, meals, setEndpoint }) {
    const [searchInput, setSearchInput] = useState("");
    const [searchBy, setSearchBy] = useState("");

    const { handleSubmit, register, formState: {errors} } = useForm();

    function handleUserInput() {
        setSearchInputHandler(searchInput);
        setSearchByHandler(searchBy);

        setEndpoint(buildEndpoint("search", searchBy, searchInput));

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