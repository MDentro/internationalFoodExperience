import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeDetails from "../../components/recipeDetails/RecipeDetails";
import buildRecipeApiEndpoint from "../../helpers/buildRecipeApiEndpoint";
import FunctionalButton from "../../components/buttons/functionalButton/FunctionalButton";

function RandomRecipeSearchPage() {
    const [idMeal, setIdMeal] = useState("");
    const [requestRefresh, toggleRequestRefresh] = useState(false);
    const [errorMessage, toggleErrorMessage] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleErrorMessage(false);
            toggleLoading(true);
            try {
                const { data : { meals }} = await axios.get(buildRecipeApiEndpoint("random", null, null, null));
                console.log("details random", meals[0]);
                console.log("details random", meals[0].idMeal);
                setIdMeal(meals[0].idMeal);
            } catch (e) {
                console.error(e);
                toggleErrorMessage(true);
            }
            toggleLoading(false);
        }

        fetchData()

    }, [requestRefresh]);

    const clickHandler = () => {
        toggleRequestRefresh(!requestRefresh);
    };


    return (
        <>
            <h1>Random Recipe</h1>

            {!errorMessage && !loading &&
            <>
                <article>
                    <p>Please try our random recipe for some inspiration. If you don't like the given recipe please
                        press
                        the button below and you'll get another one.</p>
                </article>

                <FunctionalButton
                    type="submit"
                    handleClick={clickHandler}
                >
                    NEW RANDOM RECIPE
                </FunctionalButton>

                <RecipeDetails idMeal={idMeal} />
            </>
              }
            {errorMessage && <span>Something went wrong with fetching the data, please try again later.</span>}
            {loading && <span>Loading...</span>}
        </>
    );
}

export default RandomRecipeSearchPage;