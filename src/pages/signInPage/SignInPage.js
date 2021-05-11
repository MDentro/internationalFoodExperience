import React from "react";
import { Link, useHistory } from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/buttons/submitButton/SubmitButton";


function SignInPage({ toggleAuth }) {
    const { handleSubmit, register, formState: {errors} } = useForm();
    let history = useHistory();

    function signIn() {
        toggleAuth(true);
        history.push('/search');
    }

    function onSubmit(data) {
        console.log("sign in form", data)
    }

    return (
        <>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <InputField
                        label="Username"
                        fieldRef={register("username", {required: true})}
                        name="username"
                        type="text"
                        id="username-sign-in-field"
                    />
                    {errors.username && <p className="error">Username is required</p>}
                </section>

                <section>
                    <InputField
                        label="Password"
                        fieldRef={register("password", {required: true})}
                        name="password"
                        type="password"
                        id="password-sign-in-field"
                    />
                    {errors.password && <p className="error">Password is required</p>}
                </section>

                <SubmitButton
                >
                    SIGN IN
                </SubmitButton>
            </form>
            <p>If you haven't got an account yet please <Link to="/signup">Sign up.</Link></p>
        </>
    );
}

export default SignInPage;