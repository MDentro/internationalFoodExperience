import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navigation() {
    const history = useHistory();
    const { signOut, user } = useContext(AuthContext);

    return (
        <>
            <nav>
                <ul>

                    {user !== null
                    ? <>
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
                        <button
                            type="button"
                            onClick={signOut}
                        >
                            SIGN OUT
                        </button>
                    </li>
                        </>
                    :
                        <>
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
                        <button
                            type="button"
                            onClick={() => history.push('/signin')}
                        >
                            SIGN IN
                        </button>
                    </li>
                    </>
                        }
                </ul>
            </nav>
        </>
    );
}

export default Navigation;