function createIngredientsArray (meals) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meals["strIngredient" + i]) {
            let trimmedIngredient = meals["strIngredient" + i].trim();
            if (trimmedIngredient) {
                ingredients.push(trimmedIngredient)
            }

        }
    }

    return ingredients
}

export default createIngredientsArray;