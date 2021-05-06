import createMeasuresArray from "../../helpers/createMeasuresArray";
import createIngredientsArray from "../../helpers/createIngredientsArray";


test("only add measures to array when not null or empty string", () => {
    const meals = {
        strMeasure1: "1 cubs",
        strMeasure2: "1",
        strMeasure3: "",
        strMeasure4: null,
        strMeasure5: " ",
    }

    const result = createMeasuresArray(meals);

    expect(result).toEqual([
        "1 cubs",
        "1"
    ]);
})

test("if measure array contains empty string or null do not add it to the array", () => {
    const meals = {
        strMeasure1: "",
        strMeasure2: null,
        strMeasure3: " ",
    }

    const result = createMeasuresArray(meals);

    expect(result).toEqual([]);
})

test("if there is no strMeasure in the object return empty array", () => {
    const meals = {
        title: "This is a title",
        origin: " ",
        category: null,
        strMeasure1: null,
        strIngredient1: "green red lentils",
    }

    const result = createMeasuresArray(meals);

    expect(result).toEqual([]);
})

test("if there is nothing the object return empty array", () => {
    const meals = {
    }

    const result = createMeasuresArray(meals);

    expect(result).toEqual([]);
})