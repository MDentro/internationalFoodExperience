import React from "react";
import RecipeDetails from "../../components/recipeDetails/RecipeDetails";
import { useParams } from "react-router-dom";


function RecipeDetailsPage() {
    const params = useParams();

    return (
     <>
        <RecipeDetails idMeal={params.idMeal} />
     </>
    );
}

export default RecipeDetailsPage;
