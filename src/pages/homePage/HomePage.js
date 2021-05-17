import React from "react";
import DisplayCategory from "../../components/displayCategory/DisplayCategory";
import styles from "../homePage/HomePage.module.css";

function HomePage() {
    return (
        <div className={styles.container}>
            <article className={styles["introduction-text"]}>
                <h1>Welcome to the international food experience website</h1>
                <p className={styles["subscribt-introduction"]}>After logging in you can search for nice recipes from all over the world</p>
                <p className={styles.enjoy}>Enjoy!</p>
            </article>
            <article>
                <DisplayCategory/>
            </article>
        </div>
    );
}

export default HomePage;