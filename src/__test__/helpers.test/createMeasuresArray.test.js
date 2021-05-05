import createMeasuresArray from "../../helpers/createMeasuresArray";


test("only add measures to array when not null or empty string", () => {
    const meals = {
        strMeasure1: "1 cubs",
        strMeasure2: "1",
        strMeasure3: "",
        strMeasure4: null,
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
    }

    const result = createMeasuresArray(meals);

    expect(result).toEqual([]);
})