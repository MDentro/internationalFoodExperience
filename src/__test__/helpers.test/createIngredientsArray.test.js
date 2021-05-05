import createIngredientsArray from "../../helpers/createIngredientsArray";


test ("only add ingredient to array when not null or empty string", () => {
    const meals = {
        strIngredient1: "green red lentils",
        strIngredient2: "carrot",
        strIngredient3: "",
        strIngredient4: null,
    }

    const result = createIngredientsArray(meals);

    expect(result).toEqual([
        "green red lentils",
        "carrot"
    ]);

})

test("if array contains empty string or null do not add it to the array", () => {
    const meals = {
        strIngredient1: "",
        strIngredient2: null,
    }

    const result = createIngredientsArray(meals);

    expect(result).toEqual([]);
})