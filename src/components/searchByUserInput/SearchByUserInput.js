import React from "react";
import DisplayFoundResult from "../displayFoundResult/DisplayFoundResult";

function SearchByUserInput({ meals }) {

    return (
        <>
            <div>
                {meals ? <h1>Search results:</h1> : <h1></h1>}

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
                        })};
                    </div>
                </>
                }
            </div>
        </>
    );
}

export default SearchByUserInput;
