import React, { useState, useEffect } from "react";
import axios from "axios";

function DisplayExistingSearchOptions({ chosenSearch }) {
    const [existingCategories, setExistingCategories] = useState([]);
    const [existingOrigins, setExistingOrigins] = useState([]);

    useEffect(() => {
        async function showExistingSearchOptions() {
            if(chosenSearch === "category") {
                try {
                    const result = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
                    setExistingCategories(result.data.categories);
                } catch (e) {
                    console.error(e);

                }
            }

            if(chosenSearch === "origin") {
                    try {
                        const result = await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
                        setExistingOrigins(result.data.meals);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }

            showExistingSearchOptions();
            }, [chosenSearch]);

    return (
        <>
            {existingCategories  &&
                <div className="existing-search">
                    <section className="existing-search">
                        <ul>{existingCategories && existingCategories.map((existingCategorie) => {
                           return <li key={existingCategorie.strCategory}>{existingCategorie.strCategory}</li>
                        })}</ul>
                    </section>
                </div>}

            {existingOrigins &&
                <div className="existing-search">
                    <section className="existing-search">
                        <ul>{existingOrigins && existingOrigins.map((existingOrigin) => {
                            return <li key={existingOrigin.strArea}>{existingOrigin.strArea}</li>
                        })}</ul>
                    </section>
                </div>}
        </>
    );
}

export default DisplayExistingSearchOptions;


