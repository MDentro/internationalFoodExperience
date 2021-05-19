import styles from "../../pages/recipeSearchPage/RecipeSearchPage.module.css";
import React from "react";


function SearchBar({type = "text", name, id, value, onChange, onKeyUp, placeholder, children}) {
    return (
        <span className="searchbar">
            <input
                className={styles["search-bar"]}
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                onKeyUp={onKeyUp}
                placeholder={placeholder}
            >
                {children}
            </input>
        </span>
    );
}

export default SearchBar;

