import React from "react";
import DisplayCategory from "../../components/displayCategory/DisplayCategory";


function HomePage() {
    return (
        <>
            <article>
                <h1>Welcome to the international food experience website</h1>
                <p>After logging in you can search for nice recipes from all over the world</p>
                <p>Enjoy!</p>
            </article>
            <div>
                <DisplayCategory/>
            </div>
        </>
    );
}

export default HomePage;