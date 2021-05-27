import buildUserUrlEndpoint from "../../helpers/buildUserUrlEndpoint";

test ("return signIn url when inputting apiType signIn",  () => {
    const signIn = true;
    const signUp = false;
    const requestUser = false;


    const result = buildUserUrlEndpoint(signIn, signUp, requestUser);

    expect(result).toEqual(
        `https://polar-lake-14365.herokuapp.com/api/auth/signin`
    );
})

test ("return signUp url when inputting apiType signUp",  () => {
    const signIn = false;
    const signUp = true;
    const requestUser = false;


    const result = buildUserUrlEndpoint(signIn, signUp, requestUser);

    expect(result).toEqual(
        `https://polar-lake-14365.herokuapp.com/api/auth/signup`
    );
})

test ("return requestUser url when inputting apiType requestUser",  () => {
    const signIn = false;
    const signUp = false;
    const requestUser = true;


    const result = buildUserUrlEndpoint(signIn, signUp, requestUser);

    expect(result).toEqual(
        `https://polar-lake-14365.herokuapp.com/api/user`
    );
})

test ("return errorMessage when setting more then one of the booleans on true signIn and signUp",  () => {
    const signIn = true;
    const signUp = true;
    const requestUser = false;


    const result = buildUserUrlEndpoint(signIn, signUp, requestUser);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage when setting more then one of the booleans on true signUp and requestUser",  () => {
    const signIn = false;
    const signUp = true;
    const requestUser = true;


    const result = buildUserUrlEndpoint(signIn, signUp, requestUser);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})

test ("return errorMessage when setting no value",  () => {
    const signIn = "";
    const signUp = "";
    const requestUser = "";


    const result = buildUserUrlEndpoint(signIn, signUp, requestUser);

    expect(result).toEqual(
        "Something went wrong with connecting to the right url."
    );
})
