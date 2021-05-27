import React from "react";
import DisplayCategory from "../../components/displayCategory/DisplayCategory";
import styles from "../homePage/HomePage.module.css";


function HomePage() {

    return (
        <div className={styles.container}>
            <article className={styles["introduction-text"]}>
                <h1>Welcome to International Food Experience </h1>
                <h4>After logging in you can search for nice recipes from all over the world</h4>
                <h2>Enjoy!</h2>
            </article>
            <article>
                <DisplayCategory/>
            </article>
        </div>
    );
}

export default HomePage;