import React from "react";
import DisplayFoundResult from "../displayFoundResult/DisplayFoundResult";
import styles from "./SearchByUserInput.module.css"

function SearchByUserInput({meals}) {

    return (
        <div className={styles["search-result-container"]}>
            {meals ? <h2>Search results:</h2> : <h1></h1>}

            {meals &&
            <>
                <div>
                    {meals.map((meal) => {

                        return <DisplayFoundResult
                            key={meal.idMeal}
                            image={meal.strMealThumb}
                            idMeal={meal.idMeal}
                            recipeTitle={meal.strMeal}
                        />
                    })}
                </div>
            </>
            }
        </div>
    );
}

export default SearchByUserInput;
