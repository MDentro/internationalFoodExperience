import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import FunctionalButton from "../buttons/functionalButton/FunctionalButton";
import styles from "./Navigation.module.css"

function Navigation() {
    const history = useHistory();
    const { signOut, user } = useContext(AuthContext);

    return (
        <nav>
            <ul>
                {user !== null
                    ? <>
                        <li>
                            <NavLink
                                to="/random-recipe"
                                className={styles["navigation-link"]}
                            >
                                RANDOM RECIPE
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/search"
                                className={styles["navigation-link"]}
                            >
                                SEARCH
                            </NavLink>
                        </li>

                        <li>
                            <FunctionalButton
                                type="button"
                                handleClick={signOut}
                            >
                                SIGN OUT
                            </FunctionalButton>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <NavLink
                                to="/"
                                className={styles["navigation-link"]}
                            >
                                HOME
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/signup"
                                className={styles["navigation-link"]}
                            >
                                SIGN UP
                            </NavLink>
                        </li>

                        <li>
                            <FunctionalButton
                                type="button"
                                handleClick={() => history.push('/signin')}
                            >
                                SIGN IN
                            </FunctionalButton>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
}

export default Navigation;