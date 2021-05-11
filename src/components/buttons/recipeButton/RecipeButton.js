import React from "react";

function RecipeButton({ children, clickHandler }) {

    return (
        <button
            type="button"
            onClick={clickHandler}
        >
            {children}
        </button>
    );
}

export default RecipeButton;