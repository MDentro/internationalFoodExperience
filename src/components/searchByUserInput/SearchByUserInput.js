import React from 'react';

function SearchByUserInput({ meals }) {

    return (
        <div>

            {meals ? <h1>Search results:</h1> : <h1></h1> }


            {meals && meals.map((meal, index) => {
                return <>
                    <div key={index}>
                    <img
                        alt="meal impression"
                        src={meal.strMealThumb}
                    />
                    <p>{meal.idMeal}</p>
                    <p>{meal.strMeal}</p>
                    </div>
                </>
            })}
        </div>
    );
}

export default SearchByUserInput;
