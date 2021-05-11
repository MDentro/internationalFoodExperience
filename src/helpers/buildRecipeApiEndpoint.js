function buildRecipeApiEndpoint(apiType, searchBy, searchInput, idMeal) {
    const baseUrl = `https://www.themealdb.com/api/json/v1/1`

    let endpoint = "";
    const errorMessage = "Something went wrong with connecting to the right url."

    if (apiType === "search" && idMeal === null) {
        if (searchBy === "category") {
            endpoint = baseUrl + `/filter.php?c=${searchInput}`;
        } else if (searchBy === "origin") {
            endpoint = baseUrl + `/filter.php?a=${searchInput}`;
        } else {
            endpoint = errorMessage;
        }

    } else if (apiType === "random" && searchBy === null && searchInput === null && idMeal === null) {
        endpoint = baseUrl + `/random.php`
    } else if (apiType === "categoryList" && searchBy === null && searchInput === null && idMeal === null) {
        endpoint = baseUrl + `/categories.php`
    } else if (apiType === "originList" && searchBy === null && searchInput === null && idMeal === null) {
        endpoint = baseUrl + `/list.php?a=list`
    } else if (apiType === "selectedRecipe" && searchBy === null && searchInput === null) {
        endpoint = baseUrl + `/lookup.php?i=${idMeal}`;
    }
     else {
        endpoint = errorMessage;
    }

    return endpoint;
}

export default buildRecipeApiEndpoint;