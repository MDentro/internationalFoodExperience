import React, {useState, useEffect} from "react";
import axios from "axios";
import buildRecipeUrlEndpoint from "../../helpers/buildRecipeUrlEndpoint";
import CategoryCard from "../categoryCard/CategoryCard";
import styles from "./DisplayCategory.module.css";
import {ReactComponent as LoadingIcon} from "../../assets/spinner.svg";

function DisplayCategory() {
    const [vegetarianNameCategory, setVegetarianNameCategory] = useState("");
    const [vegetarianCategoryImage, setVegetarianCategoryImage] = useState("");
    const [pastaNameCategory, setPastaNameCategory] = useState("");
    const [pastaCategoryImage, setPastaCategoryImage] = useState("");
    const [dessertNameCategory, setDessertNameCategory] = useState("");
    const [dessertCategoryImage, setDessertCategoryImage] = useState("");
    const [chickenNameCategory, setChickenNameCategory] = useState("");
    const [chickenCategoryImage, setChickenCategoryImage] = useState("");
    const [seafoodNameCategory, setSeafoodNameCategory] = useState("");
    const [seafoodCategoryImage, setSeafoodCategoryImage] = useState("");
    const [miscellaneousNameCategory, setMiscellaneousNameCategory] = useState("");
    const [miscellaneousCategoryImage, setMiscellaneousCategoryImage] = useState("");
    const [errorMessage, toggleErrorMessage] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleErrorMessage(false);
            toggleLoading(true);
            try {
                const {data: {categories}} = await axios.get(buildRecipeUrlEndpoint("categoryList", null, null, null))
                setVegetarianCategoryImage(categories[11].strCategoryThumb);
                setVegetarianNameCategory(categories[11].strCategory);
                setPastaCategoryImage(categories[5].strCategoryThumb);
                setPastaNameCategory(categories[5].strCategory);
                setDessertCategoryImage(categories[2].strCategoryThumb);
                setDessertNameCategory(categories[2].strCategory);
                setChickenCategoryImage(categories[1].strCategoryThumb);
                setChickenNameCategory(categories[1].strCategory);
                setSeafoodCategoryImage(categories[7].strCategoryThumb);
                setSeafoodNameCategory(categories[7].strCategory);
                setMiscellaneousCategoryImage(categories[4].strCategoryThumb);
                setMiscellaneousNameCategory(categories[4].strCategory);
            } catch (e) {
                console.error(e);
                toggleErrorMessage(true);
            }
            toggleLoading(false);
        }

        fetchData();

    }, []);


    return (
        <div>
            {!errorMessage && !loading &&
            <>
                <article className={styles["display-category"]}>
                    <CategoryCard
                        label={"card"}
                        img={pastaCategoryImage}
                        alt={"Pasta Category"}
                        title={pastaNameCategory}
                    />

                    <CategoryCard
                        label={"card"}
                        img={chickenCategoryImage}
                        alt={"Chicken Category"}
                        title={chickenNameCategory}
                    />

                    <CategoryCard
                        label={"card"}
                        img={vegetarianCategoryImage}
                        alt={"Vegetarian Category"}
                        title={vegetarianNameCategory}
                    />

                    <CategoryCard
                        label={"card"}
                        img={seafoodCategoryImage}
                        alt={"Seafood Category"}
                        title={seafoodNameCategory}
                    />

                    <CategoryCard
                        label={"card"}
                        img={miscellaneousCategoryImage}
                        alt={"Miscellaneous Category"}
                        title={miscellaneousNameCategory}
                    />

                    <CategoryCard
                        label={"card"}
                        img={dessertCategoryImage}
                        alt={"Dessert Category"}
                        title={dessertNameCategory}
                    />

                </article>
            </>}
            {errorMessage &&
            <span className={styles.error}>Something went wrong with fetching the data, please try again later.</span>}
            {loading && <LoadingIcon className={styles.loading}/>}
        </div>
    );
}

export default DisplayCategory;
