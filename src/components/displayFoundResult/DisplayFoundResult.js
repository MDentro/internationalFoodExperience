import React from "react";
import { NavLink } from "react-router-dom";



function DisplayFoundResult({ image, recipeTitle, idMeal }) {
    return (
        <div>
            <img
                alt="meal impression"
                src={image}
            />
            <NavLink to={`/recipes/${idMeal}`}>
                    {recipeTitle}
            </NavLink>
        </div>
    );
}

export default DisplayFoundResult;