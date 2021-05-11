import React from "react";
import { NavLink, useHistory } from "react-router-dom";

function Navigation({ isAuth, toggleAuth }) {
    const history = useHistory();

    function signIn() {
        // toggleAuth(true);
        history.push("/signin")
    }

    function signOut() {
        // toggleAuth(false);
        history.push("/")
    }

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">
                            HOME
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/signup">
                            SIGN UP
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/random-recipe">
                            RANDOM RECIPE
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/search">
                            SEARCH
                        </NavLink>
                    </li>

                    <li>
                        <button type="button" onClick={signOut}>
                            SIGN OUT
                        </button>
                    </li>

                    <li>
                        <button type="button" onClick={signIn}>
                            SIGN IN
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navigation;