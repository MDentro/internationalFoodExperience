import React from "react";
import RecipeButton from "../buttons/recipeButton/RecipeButton";

function DisplayFoundResult({ image, recipeTitle, idMeal }) {

    function printId() {
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
                clickHandler={printId}
            >
                {recipeTitle}
            </RecipeButton>
        </div>
    );
}

export default DisplayFoundResult;