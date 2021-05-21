import React from "react";
import RecipeDetails from "../../components/recipeDetails/RecipeDetails";
import {useParams} from "react-router-dom";
import styles from "./RecipeDetailsPage.module.css"


function RecipeDetailsPage() {
    const params = useParams();

    return (
        <div className={styles["recipe-page-container"]}>
            <RecipeDetails idMeal={params.idMeal}/>
        </div>
    );
}

export default RecipeDetailsPage;
