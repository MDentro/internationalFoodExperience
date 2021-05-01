function createIngredientsArray (meals) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if(meals["strIngredient" + i]) {
            ingredients.push(meals["strIngredient" + i])
        }
    }

    return ingredients
}

export default createIngredientsArray;