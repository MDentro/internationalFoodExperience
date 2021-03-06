import React, {useEffect, useState} from "react";
import axios from "axios";
import RecipeDetails from "../../components/recipeDetails/RecipeDetails";
import buildRecipeUrlEndpoint from "../../helpers/buildRecipeUrlEndpoint";
import FunctionalButton from "../../components/buttons/functionalButton/FunctionalButton"
import styles from "./RandomRecipeSearchPage.module.css"
import {ReactComponent as LoadingIcon} from "../../assets/spinner.svg";

function RandomRecipeSearchPage() {
    const [idMeal, setIdMeal] = useState("");
    const [requestRefresh, toggleRequestRefresh] = useState(false);
    const [errorMessage, toggleErrorMessage] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleErrorMessage(false);
            toggleLoading(true);
            try {
                const {data: {meals}} = await axios.get(buildRecipeUrlEndpoint("random", null, null, null));
                setIdMeal(meals[0].idMeal);
            } catch (e) {
                toggleErrorMessage(true);
            }
            toggleLoading(false);
        }

        fetchData()

    }, [requestRefresh]);

    const clickHandler = () => {
        toggleRequestRefresh(!requestRefresh);
    };


    return (
        <div className={styles["random-page-container"]}>

            <h2 className={styles["random-title-container"]}>Random Recipe</h2>

            {!errorMessage && !loading &&
            <>
                <div className={styles["random-introduction-container"]}>
                    <article>
                        <p>Please try our random recipe for some inspiration. If you don't like the given recipe please
                            press
                            the button below and you'll get another one.</p>
                    </article>

                    <div className={styles["random-button"]}>
                        <FunctionalButton
                            type="submit"
                            handleClick={clickHandler}
                        >
                            NEW RANDOM RECIPE
                        </FunctionalButton>
                    </div>
                </div>

                <RecipeDetails idMeal={idMeal}/>
            </>
            }
            {errorMessage &&
            <span className={styles.error}>Something went wrong with fetching the data, please try again later.</span>}
            {loading && <LoadingIcon className={styles.loading}/>}
        </div>
    );
}

export default RandomRecipeSearchPage;