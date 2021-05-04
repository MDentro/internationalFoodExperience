import React from "react";
import RecipeButton from "../buttons/recipeButton/RecipeButton";

function DisplayFoundResult({ image, recipeTitle, idMeal }) {
    return (
        <div>
            <img
                alt="meal impression"
                src={image}
            />
            <p>{idMeal}</p>

            <RecipeButton>
                {recipeTitle}
            </RecipeButton>
        </div>
    );
}

export default DisplayFoundResult;