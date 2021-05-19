import React, {useState, useEffect} from "react";
import axios from "axios";
import createIngredientsArray from "../../helpers/createIngredientsArray";
import createMeasuresArray from "../../helpers/createMeasuresArray";
import buildRecipeApiEndpoint from "../../helpers/buildRecipeApiEndpoint";
import styles from "./RecipeDetails.module.css";


function RecipeDetails({idMeal}) {
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
                const {data: {meals}} = await axios.get(buildRecipeApiEndpoint("selectedRecipe", null, null, idMeal));
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

        if (idMeal) {
            fetchData();
        }

    }, [idMeal]);


    return (
        <div>
            {!errorMessage && !loading &&
            <>
                    <div className={styles.introduction}>
                        <h2>{name}</h2>
                        <section>
                            <span>Category: {category}</span>
                            <span>Origin: {origin}</span>
                        </section>
                    </div>

                <article className={styles["recipe-container"]}>
                    <img
                        className={styles.resize}
                        src={image} alt="recipe"
                    />

                    <article className={styles["ingredients-container"]}>
                        <h4>Ingredients</h4>
                        <div className={styles["ingredients-measure-container"]}>
                            <div className={styles["ingredients-measure"]}>
                                <section className="measures">
                                    <div>{measures && measures.map((measure, index) => {
                                        return <li key={index}>{measure}</li>
                                    })}</div>
                                </section>
                            </div>

                            <section className={styles["ingredients-name"]}>
                                <div>{ingredients && ingredients.map((ingredient, index) => {
                                    return <li key={index}>{ingredient}</li>
                                })}</div>
                            </section>
                        </div>
                    </article>

                    <section className={styles["instruction-title-container"]}>
                        <h4>Instructions</h4>
                        <p className={styles["instruction-container"]}>{instruction.split("\r\n").map((instruction, index) => {
                            return <span key={index}>
                        {instruction}
                                <br/>
                    </span>
                        })}</p>
                    </section>

                </article>
            </>}
            {errorMessage && <span className={styles.error}>Something went wrong with fetching the data, please try again later.</span>}
        </div>
    );
}

export default RecipeDetails;
