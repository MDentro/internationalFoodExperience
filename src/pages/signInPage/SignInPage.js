import React from "react";
import { useHistory } from "react-router-dom";


function SignInPage({ toggleAuth }) {
    let history = useHistory();

    function signIn() {
        toggleAuth(true);
        history.push('/search');
    }

    return (
        <section>
            <h1>Sign in</h1>
        </section>
    );
}

export default SignInPage;