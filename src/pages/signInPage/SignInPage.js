import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import {useForm} from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import buildUserApiEndpoint from "../../helpers/buildUserApiEndpoint";
import Button from "../../components/buttons/button/Button";
import styles from "./SignInPage.module.css";

function SignInPage() {
    const [errorMessage, toggleErrorMessage] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const {login} = useContext(AuthContext);
    const {handleSubmit, register, formState: {errors}} = useForm()


    async function onSubmit(data) {
        console.log(data);
        toggleErrorMessage(false);
        toggleLoading(true);
        try {
            const result = await axios.post(buildUserApiEndpoint(true, false, false), data);
            console.log(result);
            console.log(result.data.accessToken);
            login(result.data.accessToken);
        } catch (e) {
            console.error(e)
            toggleErrorMessage(true);
        }
        toggleLoading(false);
    }

    return (
        <div className={styles.container}>
            <article className={styles["form-container-user"]}>
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
                        {errors.username && <p className={styles.error}>Username is required</p>}
                    </section>

                    <section>
                        <InputField
                            label="Password"
                            fieldRef={register("password", {required: true})}
                            name="password"
                            type="password"
                            id="password-sign-in-field"
                        />
                        {errors.password && <p className={styles.error}>Password is required</p>}
                    </section>
                    <section className={styles["align-button"]}>
                        <Button
                            type="submit"
                        >
                            SIGN IN
                        </Button>
                    </section>
                </form>
                <p className={styles["navigation-register-help"]}>If you haven't got an account yet please <Link
                    to="/signup">Sign
                    up.</Link></p>
                {errorMessage && <span>Something went wrong with logging you in, please try again later.</span>}
                {loading && <span>Loading...</span>}
            </article>
        </div>
    );
}

export default SignInPage;