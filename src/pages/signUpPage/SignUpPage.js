import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/buttons/submitButton/SubmitButton";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SignUpPage() {
    const [registerSucces, toggleRegisterSucces] = useState(false);
    const history = useHistory();

    const { handleSubmit, register, formState: {errors} } = useForm();

    async function onSubmit(data) {
        console.log(data);
        try {
            const result = await axios.post(`https://polar-lake-14365.herokuapp.com/api/auth/signup`,  {
                email: data.email,
                password: data.password,
                username: data.username,
                role: ["user"]
            });
            console.log(result)
            toggleRegisterSucces(true);
            setTimeout(() => {
                history.push("/signin");
            } ,2000);

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1>Sign up</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <InputField
                        label="Username"
                        fieldRef={register("username", {required: true, pattern: /[0-9a-zA-Z]{6,}/})}
                        name="username"
                        type="text"
                        id="username-sign-up-field"
                    />
                    {errors.username && <p className="error">Username is required and should have a minimum of six characters with only letters and numbers.</p>}
                </section>

                <section>
                    <InputField
                        label={"Email"}
                        fieldRef={register("email", {required: true, pattern: /\S+@\S+\.\S+/})}
                        name="email"
                        type="email"
                        id="email-sign-up-field"
                    />
                    {errors.email && <p className="error">Email is required.</p>}
                </section>

                <section>
                    <InputField
                        label="Password"
                        fieldRef={register("password", {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/})}
                        name="password"
                        type="password"
                        id="password-sign-up-field"
                    />
                    {errors.password && <p className="error">Password is required and should have a minimum of eight characters with at least one uppercase letter, one lowercase letter and one number.</p>}
                </section>

                <SubmitButton
                >
                    REGISTER
                </SubmitButton>
                {registerSucces === true && <p>The registration succeeded. You'll  be transferred to the login page</p>}
            </form>
        </>
    );
}

export default SignUpPage;