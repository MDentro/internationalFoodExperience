import React from "react";
import RecipeDetails from "../../components/recipeDetails/RecipeDetails";
import { useParams } from "react-router-dom";


function RecipeDetailsPage() {
    const params = useParams();

    return (
     <>
        <RecipeDetails idMeal={params.idMeal} />
         {console.log("is dit undefined", params)}
     </>
    );
}

export default RecipeDetailsPage;
