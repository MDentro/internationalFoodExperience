import React, { useState, useEffect } from 'react';
import axios from 'axios';
import buildEndpoint from "../../helpers/buildEndpoint";

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
                const result = await axios.get(buildEndpoint("categoryList", null, null))
                setCategoryData(result.data.categories);
                setVegetarianCategoryImage(result.data.categories[11].strCategoryThumb);
                setVegetarianNameCategory(result.data.categories[11].strCategory);
                setPastaCategoryImage(result.data.categories[5].strCategoryThumb);
                setPastaNameCategory(result.data.categories[5].strCategory);
                setDessertCategoryImage(result.data.categories[2].strCategoryThumb);
                setDessertNameCategory(result.data.categories[2].strCategory);
                setChickenCategoryImage(result.data.categories[1].strCategoryThumb);
                setChickenNameCategory(result.data.categories[1].strCategory);
                setSeafoodCategoryImage(result.data.categories[7].strCategoryThumb);
                setSeafoodNameCategory(result.data.categories[7].strCategory);
                setMiscellaneousCategoryImage(result.data.categories[4].strCategoryThumb);
                setMiscellaneousNameCategory(result.data.categories[4].strCategory);
                console.log(result.data.categories[11]);
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
