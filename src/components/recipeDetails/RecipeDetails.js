import React, {useState, useEffect} from 'react';
import axios from 'axios';
import createIngredientsArray from "../../helpers/createIngredientsArray";
import createMeasuresArray from "../../helpers/createMeasuresArray";


function RecipeDetails({ id }) {
    const [recipeData, setRecipeData] = useState(null);
    const [name, setName] = useState("");
    const [origin, setOrigin] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [measures, setMeasures] = useState([]);
    const [instruction, setInstruction] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const { data : { meals }} = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
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
            }
        }

        fetchData();

    }, [id]);


    return (
        <div>
            <article className="recipe-container">
                <h1>{name}</h1>
                <section>
                    <div>Category: {category}</div>
                    <div>Origin: {origin}</div>
                </section>

                <img src={image} alt="recipe"/>

                <div className="ingredients">
                    <section className="ingredients">
                        <p>Ingredients</p>
                        <div>{ingredients && ingredients.map((ingredient) => {
                            return <li key={ingredient}>{ingredient}:</li>
                        })}</div>
                    </section>

                    <section className="measures">
                        <div>{measures && measures.map((measure, index) => {
                            return <li key={index}>{measure}</li>
                        })}</div>
                    </section>
                </div>

                <section className="instructions">
                    <p>Instructions</p>
                    <p>{instruction.split("\r\n").map((instruction, index) => {
                        return <span key={index}>
                        {instruction}
                            <br/>
                    </span>
                    })}</p>
                </section>

            </article>
        </div>
    );
}

export default RecipeDetails;
