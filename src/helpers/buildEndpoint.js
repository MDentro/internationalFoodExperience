function buildEndpoint(apiType, searchBy, searchInput) {
    let baseUrl = "https://www.themealdb.com/api/json/v1/1"

    let endpoint = "";

    if (apiType === "search") {
        if (searchBy === "category") {
            endpoint = baseUrl + `/filter.php?c=${searchInput}`;
        } else if (searchBy === "origin") {
            endpoint = baseUrl + `/filter.php?a=${searchInput}`;
        }

    } else if (apiType === "random") {
        endpoint = baseUrl + `/random.php`
    }

     else if (apiType === "categoryList") {
        endpoint = baseUrl + `/categories.php`
    }

    else if (apiType === "originList") {
        endpoint = baseUrl + `/list.php?a=list`
    }

    return endpoint;
}

export default buildEndpoint;