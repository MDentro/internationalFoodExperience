import createIngredientsArray from "../../helpers/createIngredientsArray";

test ("only add ingredient to array when not null or empty string", () => {
    const meals = {
        strIngredient1: "green red lentils",
        strIngredient2: "carrot",
        strIngredient3: "",
        strIngredient4: null,
        strIngredient5: " ",
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
        strIngredient3: " ",
    }

    const result = createIngredientsArray(meals);

    expect(result).toEqual([]);
})

test("if there is no strIngredient in the object return empty array", () => {
    const meals = {
        title: "This is a title",
        origin: " ",
        category: null,
        strIngredient1: null,
        strMeasure1: "1 cubs",
    }

    const result = createIngredientsArray(meals);

    expect(result).toEqual([]);
})

test("if there is nothing the object return empty array", () => {
    const meals = {
    }

    const result = createIngredientsArray(meals);

    expect(result).toEqual([]);
})