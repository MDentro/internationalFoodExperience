import React, {useEffect, useState} from "react";
import axios from 'axios';
import RecipeDetails from "../../components/recipeDetails/RecipeDetails";

function RandomRecipeSearchPage() {
    const [id, setId] = useState("");
    const [requestRefresh, toggleRequestRefresh] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`)
                console.log("details random", result.data.meals[0]);
                console.log("details random", result.data.meals[0].idMeal);
                setId(result.data.meals[0].idMeal);
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();

    }, [requestRefresh]);

    const clickHandler = () => {
        toggleRequestRefresh(!requestRefresh);
    };

    return (
        <>
            <article>
                <h1>Random Recipe</h1>
                <p>Please try our random recipe for some inspiration. If you don't like the given recipe please press
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
    );
}

export default RandomRecipeSearchPage;