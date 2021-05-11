import React from "react";
import { useHistory } from "react-router-dom";
import RecipeButton from "../buttons/recipeButton/RecipeButton";

function DisplayFoundResult({ image, recipeTitle, idMeal }) {
    const history = useHistory();

    function showRecipe() {

        history.push("/recipe")


        console.log(idMeal);
    }

    return (
        <div>
            <img
                alt="meal impression"
                src={image}
            />
            <p>{idMeal}</p>

            <RecipeButton
                clickHandler={showRecipe}
            >
                {recipeTitle}
            </RecipeButton>
        </div>
    );
}

export default DisplayFoundResult;