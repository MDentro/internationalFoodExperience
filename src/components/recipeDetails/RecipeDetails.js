import React, { useState, useEffect } from "react";
import axios from "axios";
import createIngredientsArray from "../../helpers/createIngredientsArray";
import createMeasuresArray from "../../helpers/createMeasuresArray";
import buildRecipeApiEndpoint from "../../helpers/buildRecipeApiEndpoint";


function RecipeDetails({ idMeal }) {
    const [recipeData, setRecipeData] = useState(null);
    const [name, setName] = useState("");
    const [origin, setOrigin] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [measures, setMeasures] = useState([]);
    const [instruction, setInstruction] = useState("");
    const [errorMessage, toggleErrorMessage] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleErrorMessage(false);
            toggleLoading(true);
            try {
                const {data: { meals }} = await axios.get(buildRecipeApiEndpoint("selectedRecipe", null, null, idMeal));
                console.log("details", meals[0]);
                setRecipeData(meals[0]);
                setName(meals[0].strMeal);
                setCategory(meals[0].strCategory);
                setOrigin(meals[0].strArea);
                setImage(meals[0].strMealThumb);
                setIngredients(createIngredientsArray(meals[0]));
                setMeasures(createMeasuresArray(meals[0]));
                setInstruction(meals[0].strInstructions);
            } catch (e) {
                console.error(e);
                toggleErrorMessage(true);
            }
            toggleLoading(false);
        }

    if(idMeal) {
        fetchData();
    }

    }, [idMeal]);


    return (
        <div>
            {!errorMessage && !loading &&
            <>
                <article className="recipe-container">
                    <h1>{name}</h1>
                    <section>
                        <div>Category: {category}</div>
                        <div>Origin: {origin}</div>
                    </section>

                    <img src={image} alt="recipe"/>

                    <div className="ingredients">
                        <p>Ingredients</p>
                        <section className="measures">
                            <div>{measures && measures.map((measure, index) => {
                                return <li key={index}>{measure}</li>
                            })}</div>
                        </section>
                    </div>

                        <section className="ingredients">
                            <div>{ingredients && ingredients.map((ingredient, index) => {
                                return <li key={index}>{ingredient}</li>
                            })}</div>
                        </section>

                    <section className="instructions">
                        <p>Instructions</p>
                        <p>{instruction.split("\r\n").map((instruction) => {
                            return <span key={instruction}>
                        {instruction}
                                <br/>
                    </span>
                        })}</p>
                    </section>

                </article>
            </>}
            {errorMessage && <span>Something went wrong with fetching the data, please try again later.</span>}
        </div>
    );
}

export default RecipeDetails;
