import React, {useContext, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import {useForm} from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import buildUserUrlEndpoint from "../../helpers/buildUserUrlEndpoint";
import Button from "../../components/buttons/button/Button";
import styles from "./SignInPage.module.css";
import {ReactComponent as LoadingIcon} from "../../assets/spinner.svg";

function SignInPage() {
    const [errorMessage, toggleErrorMessage] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const {login, user} = useContext(AuthContext);
    const {handleSubmit, register, formState: {errors}} = useForm()

    async function onSubmit(data) {
        toggleErrorMessage(false);
        toggleLoading(true);
        try {
            const result = await axios.post(buildUserUrlEndpoint(true, false, false), data);
            login(result.data.accessToken);
        } catch (e) {
            console.error(e)
            toggleErrorMessage(true)
        }
        toggleLoading(false);
    }

    if(user) {
        return <Redirect to="/search"/>
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
                <p className={styles["navigation-register-help"]}>If you haven't got an account yet please go to
                    the <Link
                        to="/signup">Sign
                        up</Link> page.</p>
                {errorMessage &&
                <span className={styles.error}>Something went wrong with logging you in, please try again later.</span>}
                {loading && <LoadingIcon className={styles.loading}/>}
            </article>
        </div>
    );
}

export default SignInPage;