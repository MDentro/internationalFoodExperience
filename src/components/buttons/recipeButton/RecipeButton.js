import React from "react";

function RecipeButton({ children }) {

    return (
        <button
            type="button"
        >
            {children}
        </button>
    );
}

export default RecipeButton;