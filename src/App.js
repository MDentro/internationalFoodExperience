import React, {useContext} from "react";
import "./App.module.css";
import {
    Switch,
    Route, Redirect,
} from "react-router-dom";
import RecipeDetailsPage from "./pages/recipeDetailsPage/RecipeDetailsPage";
import HomePage from "./pages/homePage/HomePage";
import RecipeSearchPage from "./pages/recipeSearchPage/RecipeSearchPage";
import RandomRecipeSearchPage from "./pages/randomRecipeSearchPage/RandomRecipeSearchPage";
import SignInPage from "./pages/signInPage/SignInPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import Navigation from "./components/navigation/Navigation"
import {AuthContext} from "./context/AuthContext"


function PrivateRoute({children, user, ...rest}) {
    return (
        <Route {...rest}>
            {user !== null ? children : <Redirect to="/"/>}
        </Route>
    )
}

function App() {
    const {user} = useContext(AuthContext);

    return (
        <>
            <div>
                <Navigation/>
                <Switch>
                    <Route
                        exact path="/">
                        <HomePage/>
                    </Route>
                    <Route path="/signup">
                        <SignUpPage/>
                    </Route>
                    <Route path="/signin">
                        <SignInPage/>
                    </Route>
                    <PrivateRoute path="/random-recipe" user={user}>
                        <RandomRecipeSearchPage/>
                    </PrivateRoute>
                    <PrivateRoute path="/search" user={user}>
                        <RecipeSearchPage/>
                    </PrivateRoute>
                    <PrivateRoute path="/recipes/:idMeal" user={user}>
                        <RecipeDetailsPage/>
                    </PrivateRoute>
                </Switch>
            </div>
        </>
    );
}

export default App;
