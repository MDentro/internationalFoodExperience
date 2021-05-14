function buildUserApiEndpoint(signIn, signUp, requestUser) {
    const baseUrl = `https://polar-lake-14365.herokuapp.com`

    let endpoint = "";
    const errorMessage = "Something went wrong with connecting to the right url."

    if (signIn === true && signUp === false && requestUser === false) {
            endpoint = baseUrl + `/api/auth/signin`;
        } else if (signIn === false && signUp === true && requestUser === false) {
            endpoint = baseUrl + `/api/auth/signup`;
        } else if (signIn === false && signUp === false && requestUser === true) {
        endpoint = baseUrl + `/api/user`;
        } else {
            endpoint = errorMessage;
        }

    return endpoint;
}

export default buildUserApiEndpoint;