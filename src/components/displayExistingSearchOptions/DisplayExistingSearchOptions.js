import React, { useState, useEffect } from "react";
import axios from "axios";
import buildEndpoint from "../../helpers/buildEndpoint";

function DisplayExistingSearchOptions({ chosenSearch }) {
    const [existingCategories, setExistingCategories] = useState([]);
    const [existingOrigins, setExistingOrigins] = useState([]);

    useEffect(() => {
        async function showExistingSearchOptions() {
            if(chosenSearch === "category") {
                try {
                    const result = await axios.get(buildEndpoint("categoryList", null, null))
                    setExistingCategories(result.data.categories);
                } catch (e) {
                    console.error(e);

                }
            }

            if(chosenSearch === "origin") {
                    try {
                        const result = await axios.get(buildEndpoint("originList", null, null))
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


