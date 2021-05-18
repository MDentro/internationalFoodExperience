import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./DisplayFoundResult.module.css";


function DisplayFoundResult({image, recipeTitle, idMeal}) {
    return (
        <div className={styles["search-result-container"]}>
            <img
                className={styles.resize}
                alt="meal impression"
                src={image}
            />
            <div className={styles["container-link"]}>
                <NavLink
                    className={styles["recipe-link"]}
                    to={`/recipes/${idMeal}`}
                >
                    {recipeTitle}
                </NavLink>
            </div>
        </div>
    );
}

export default DisplayFoundResult;