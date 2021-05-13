import React, { useContext } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/buttons/submitButton/SubmitButton";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


function SignInPage() {
    const { login } = useContext(AuthContext);
    const { handleSubmit, register, formState: {errors} } = useForm()


    async function onSubmit(data) {
        console.log(data);
        try {
            const result = await axios.post(`https://polar-lake-14365.herokuapp.com/api/auth/signin`, data);
            console.log(result);
            console.log(result.data.accessToken);
            login(result.data.accessToken)
        } catch (e) {
            console.error(e)
        }
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