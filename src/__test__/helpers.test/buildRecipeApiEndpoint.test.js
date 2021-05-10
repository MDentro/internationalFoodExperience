import buildRecipeApiEndpoint from "../../helpers/buildRecipeApiEndpoint";

test ("return vegan url when inputting apiType search and searchBy category and searchInput vegan is given and id null", async () => {
    const apiType = "search";
    const searchBy = "category";
    const searchInput = "vegan";
    const id = null;

    const result = await buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=vegan`
    );
})

test ("return errorMessage when inputting apiType search, searchBy and id are null and searchInput vegan is given", () => {
    const apiType = "search";
    const searchBy = null;
    const searchInput = "vegan";
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage when inputting apiType search and searchBy and id with a value", () => {
    const apiType = "search";
    const searchBy = "category";
    const searchInput = "vegan";
    const id = "1234";


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return vegan url when inputting apiType search and searchBy origin and searchInput dutch is given and id null", () => {
    const apiType = "search";
    const searchBy = "origin";
    const searchInput = "dutch";
    const id = null;

    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=dutch`
    );
})

test ("return errorMessage when inputting apiType search, searchBy and id are null and searchInput dutch is given", () => {
    const apiType = "search";
    const searchBy = null;
    const searchInput = "dutch";
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage when inputting apiType search and searchBy and id with a value for searchBy origin", () => {
    const apiType = "search";
    const searchBy = "origin";
    const searchInput = "dutch";
    const id = "1234";


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return random url when inputting apiType random and searchBy null and searchInput null and id null", () => {
    const apiType = "random";
    const searchBy = null;
    const searchInput = null;
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        `https://www.themealdb.com/api/json/v1/1/random.php`
    );
})

test ("return errorMessage when apiType random isn't given", () => {
    const apiType = "test";
    const searchBy = null;
    const searchInput = null;
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage at apiType random when searchBy is not null", () => {
    const apiType = "random";
    const searchBy = "category";
    const searchInput = null;
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage at apiType rondom when searchInput is not null", () => {
    const apiType = "random";
    const searchBy = null;
    const searchInput = "dessert";
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage at apiType random when id is not null, searchBy and searchInput are null", () => {
    const apiType = "random";
    const searchBy = null;
    const searchInput = null;
    const id = "1234";


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return categoryList url when inputting apiType is categoryList and searchBy null and searchInput null and id is null", () => {
    const apiType = "categoryList";
    const searchBy = null;
    const searchInput = null;
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
})

test ("return errorMessage when apiType categoryList is not given", () => {
    const apiType = "test";
    const searchBy = null;
    const searchInput = null;
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage at apiType categoryList when searchBy is not null", () => {
    const apiType = "categoryList";
    const searchBy = "category";
    const searchInput = null;
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage at apiType categoryList when searchInput is not null", () => {
    const apiType = "categoryList";
    const searchBy = null;
    const searchInput = "dessert";
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

//TODO
// hier even naar kijken
test ("return errorMessage at apiType categoryList when id is not null, searchBy and searchInput are null", () => {
    const apiType = "categoryList";
    const searchBy = null;
    const searchInput = null;
    const id = "1234";


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})


test ("return originList url when inputting apiType random and searchBy null and searchInput null and id is null", () => {
    const apiType = "originList";
    const searchBy = null;
    const searchInput = null;
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
})

test ("return errorMessage when apiType originList isn't given", () => {
    const apiType = "test";
    const searchBy = null;
    const searchInput = null;
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage at apiType originList when searchBy is not null", () => {
    const apiType = "originList";
    const searchBy = "category";
    const searchInput = null;
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage at apiType originList when searchInput is not null", () => {
    const apiType = "originList";
    const searchBy = null;
    const searchInput = "dessert";
    const id = null;


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage at apiType originList when id is not null, searchBy and searchInput are null", () => {
    const apiType = "originList";
    const searchBy = null;
    const searchInput = null;
    const id = "1234";


    const result = buildRecipeApiEndpoint(apiType, searchBy, searchInput, id);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})








