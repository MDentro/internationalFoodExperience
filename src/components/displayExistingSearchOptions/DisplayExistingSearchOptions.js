import React, { useState, useEffect } from "react";
import axios from "axios";
import buildRecipeApiEndpoint from "../../helpers/buildRecipeApiEndpoint";

function DisplayExistingSearchOptions({ chosenSearch }) {
    const [existingCategories, setExistingCategories] = useState([]);
    const [existingOrigins, setExistingOrigins] = useState([]);

    useEffect(() => {
        async function showExistingSearchOptions() {
            if(chosenSearch === "category") {
                try {
                    const  { data : { categories }} = await axios.get(buildRecipeApiEndpoint("categoryList", null, null, null))
                    setExistingCategories(categories);
                } catch (e) {
                    console.error(e);

                }
            }

            if(chosenSearch === "origin") {
                    try {
                        const { data : { meals }} = await axios.get(buildRecipeApiEndpoint("originList", null, null, null))
                        setExistingOrigins(meals);
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


