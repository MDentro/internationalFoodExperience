import React from 'react';
import './App.css';
import RecipeDetailsPage from "./pages/recipeDetailsPage/RecipeDetailsPage";
import HomePage from "./pages/homePage/HomePage";

function App() {
  return (
   <>
     <h1>International Food Experience</h1>
      <RecipeDetailsPage/>
     <HomePage />
   </>
  );
}

export default App;
