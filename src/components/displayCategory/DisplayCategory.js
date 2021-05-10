import React, { useState, useEffect } from 'react';
import axios from 'axios';
import buildRecipeApiEndpoint from "../../helpers/buildRecipeApiEndpoint";

function DisplayCategory() {
    const [categoryData, setCategoryData] = useState(null);
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

    useEffect(() => {
        async function fetchData() {
            try {
                const { data : { categories }}  = await axios.get(buildRecipeApiEndpoint("categoryList", null, null, null))
                setCategoryData(categories);
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
                console.log(categories[0]);
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();

    }, []);


    return (
        <div>
            <article className="display-category">

                <section className="pasta">
                    <img src={pastaCategoryImage} alt="Pasta Category"/>
                    <p>{pastaNameCategory}</p>
                </section>

                <section className="chicken">
                    <img src={chickenCategoryImage} alt="Chicken Category"/>
                    <p>{chickenNameCategory}</p>
                </section>

                <section className="vegetarian">
                    <img src={vegetarianCategoryImage} alt="Vegetarian Category"/>
                    <p>{vegetarianNameCategory}</p>
                </section>

                <section className="seafood">
                    <img src={seafoodCategoryImage} alt="Seafood Category"/>
                    <p>{seafoodNameCategory}</p>
                </section>

                <section className="miscellaneous">
                    <img src={miscellaneousCategoryImage} alt="Seafood Category"/>
                    <p>{miscellaneousNameCategory}</p>
                </section>

                <section className="dessert">
                    <img src={dessertCategoryImage} alt="Dessert Category"/>
                    <p>{dessertNameCategory}</p>
                </section>

            </article>
        </div>
    );
}

export default DisplayCategory;
