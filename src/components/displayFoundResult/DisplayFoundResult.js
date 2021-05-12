import React from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import RecipeButton from "../buttons/recipeButton/RecipeButton";
import RecipeDetails from "../recipeDetails/RecipeDetails";
import RecipeDetailsPage from "../../pages/recipeDetailsPage/RecipeDetailsPage";

function DisplayFoundResult({ image, recipeTitle, idMeal }) {
    const history = useHistory();

    // function sendId() {
    //     let  idMeal  = useParams();
    //     return idMeal;
    // }


    function showRecipe() {

        // <RecipeDetailsPage idMeal={idMeal} />
        // history.push("/recipe/:idMeal", {idMeal})


        console.log(idMeal);
    }

    return (
        <div>
            <img
                alt="meal impression"
                src={image}
            />
            <p>{idMeal}</p>
            <Link to={`/recipes/${idMeal}`}>
                <RecipeButton
                    clickHandler={showRecipe}
                >
                    {recipeTitle}
                </RecipeButton>
            </Link>
        </div>
    );
}

export default DisplayFoundResult;