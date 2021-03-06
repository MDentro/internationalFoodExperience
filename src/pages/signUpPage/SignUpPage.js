import React, {useState} from "react";
import {useForm} from "react-hook-form";
import InputField from "../../components/inputField/InputField";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import buildUserUrlEndpoint from "../../helpers/buildUserUrlEndpoint";
import Button from "../../components/buttons/button/Button";
import styles from "./SignUpPage.module.css";

function SignUpPage() {
    const [errorMessage, setErrorMessage] = useState("");
    const [registerSucces, toggleRegisterSucces] = useState(false);
    const history = useHistory();

    const {handleSubmit, register, formState: {errors}} = useForm();

    async function onSubmit(data) {
        setErrorMessage("");
        try {
            const result = await axios.post(buildUserUrlEndpoint(false, true, false), {
                email: data.email,
                password: data.password,
                username: data.username,
                role: ["user"]
            });
            toggleRegisterSucces(true);
            setTimeout(() => {
                history.push("/signin");
            }, 2000);

        } catch (e) {
            const error = e.response.data.message;
            setErrorMessage(error.substring(7, error.length - 1) + ".");
        }
    }


    return (
        <div className={styles.container}>
            <article className={styles["form-container-user"]}>
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
                        {errors.username &&
                        <p className={styles.error}>Username is required and should have a minimum of six characters
                            with only letters and numbers.</p>}
                    </section>

                    <section>
                        <InputField
                            label={"Email"}
                            fieldRef={register("email", {required: true, pattern: /\S+@\S+\.\S+/})}
                            name="email"
                            type="email"
                            id="email-sign-up-field"
                        />
                        {errors.email && <p className={styles.error}>Email is required.</p>}
                    </section>

                    <section>
                        <InputField
                            label="Password"
                            fieldRef={register("password", {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                            })}
                            name="password"
                            type="password"
                            id="password-sign-up-field"
                        />
                        {errors.password &&
                        <p className={styles.error}>Password is required and should have a minimum of eight characters
                            with at
                            least one uppercase letter, one lowercase letter and one number.</p>}
                    </section>

                    {errorMessage && <span className={styles.error}>{errorMessage}</span>}

                    <section className={styles["align-button"]}>
                        <Button
                            type="submit"
                        >
                            REGISTER
                        </Button>
                    </section>
                    {registerSucces === true &&
                    <p className={styles["succes-registration"]}>The registration succeeded. You'll be transferred to
                        the login page</p>}

                </form>
                <p className={styles["navigation-register-help"]}>If you already have an account please go to the <Link
                    to="/signin">Sign In</Link> page.</p>
            </article>
        </div>
    );
}

export default SignUpPage;