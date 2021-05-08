import React, {useEffect, useState} from "react";
import axios from 'axios';
import RecipeDetails from "../../components/recipeDetails/RecipeDetails";
import buildEndpoint from "../../helpers/buildEndpoint";

function RandomRecipeSearchPage({ toggleErrorMessage, errorMessage }) {
    const [id, setId] = useState("");
    const [requestRefresh, toggleRequestRefresh] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleErrorMessage(false);
            try {
                const result = await axios.get(buildEndpoint("random", null, null));
                console.log("details random", result.data.meals[0]);
                console.log("details random", result.data.meals[0].idMeal);
                setId(result.data.meals[0].idMeal);
            } catch (e) {
                console.error(e);
                toggleErrorMessage(true);
            }
        }

        fetchData();

    }, [requestRefresh]);

    const clickHandler = () => {
        toggleRequestRefresh(!requestRefresh);
    };

    return (
        <>
            <h1>Random Recipe</h1>

            {!errorMessage &&
            <>
                <article>
                    <p>Please try our random recipe for some inspiration. If you don't like the given recipe please
                        press
                        the button below and you'll get another one.</p>
                </article>

                <RecipeDetails id={id}/>

                <button
                    type="submit"
                    onClick={clickHandler}
                >
                    NEW RANDOM RECIPE
                </button>
            </>
            }
        </>
    );
}

export default RandomRecipeSearchPage;