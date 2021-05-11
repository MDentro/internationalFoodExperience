import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/buttons/submitButton/SubmitButton";

function SignUpPage() {
    const { handleSubmit, register, formState: {errors} } = useForm();


    function onSubmit(data) {
        console.log("sign up form", data)
    }
    return (
        <>
            <h1>Sign up</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <InputField
                        label="Username"
                        fieldRef={register("username", {required: true})}
                        name="username"
                        type="text"
                        id="username-sign-up-field"
                    />
                    {errors.username && <p className="error">Username is required</p>}
                </section>

                <section>
                    <InputField
                        label={"Email"}
                        fieldRef={register("email", {required: true})}
                        name="email"
                        type="email"
                        id="email-sign-up-field"
                    />
                    {errors.email && <p className="error">Email is required</p>}
                </section>

                <section>
                    <InputField
                        label="Password"
                        fieldRef={register("password", {required: true})}
                        name="password"
                        type="password"
                        id="password-sign-up-field"
                    />
                    {errors.password && <p className="error">Password is required</p>}
                </section>

                <SubmitButton
                >
                    REGISTER
                </SubmitButton>
            </form>
        </>
    );
}

export default SignUpPage;