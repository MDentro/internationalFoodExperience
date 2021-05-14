import React, { useContext } from "react";
import "./App.css";
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
import Navigation from "./components/navigation/navigation"
import { AuthContext } from "./context/AuthContext"


function PrivateRoute({ children, user }) {
    console.log("dit is de user aan het begin en dit is null?", user)
    // omdat we nog steeds alle mogelijke properties zoals exact etc. op Route willen zetten, kunnen we met de ...rest operator zeggen:
    // al die andere props die je verder nog ontvangt, zet die ook allemaal maar op <Route>
    return (
        <Route>
            {user !== null ? children : <Redirect to="/" />}
            {console.log("dit is de user aan het begin2", user)}
        </Route>
    )
}

function App() {
    const {  user } = useContext(AuthContext);

    return (
        <>
            <h1>International Food Experience</h1>
            <>
                <div>
                    <Navigation/>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route path="/signup">
                            <SignUpPage />
                        </Route>
                        <Route path="/signin" >
                            <SignInPage />
                        </Route>
                        {console.log("Hier is de waarde van user wel gevuld", user)}

                        <PrivateRoute path="/random-recipe" user={user}>
                            <RandomRecipeSearchPage />
                        </PrivateRoute>
                        <PrivateRoute path="/search" user={user}>
                            <RecipeSearchPage />
                        </PrivateRoute>
                        <Route path="/recipes/:idMeal">
                            <RecipeDetailsPage />
                        </Route>
                    </Switch>
                </div>
            </>
        </>
    );
}

export default App;
