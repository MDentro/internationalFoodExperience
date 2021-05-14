import React, { useState, useEffect } from "react";
import axios from "axios";
import buildRecipeApiEndpoint from "../../helpers/buildRecipeApiEndpoint";

function DisplayExistingSearchOptions({ searchBy }) {
    const [existingCategories, setExistingCategories] = useState([]);
    const [existingOrigins, setExistingOrigins] = useState([]);
    const [errorMessage, toggleErrorMessage] = useState(false);

    useEffect(() => {
        toggleErrorMessage(false);
        setExistingCategories([]);
        setExistingOrigins([]);

        async function showExistingSearchOptions() {
            if(searchBy === "category") {
                try {
                    const  { data : { categories }} = await axios.get(buildRecipeApiEndpoint("categoryList", null, null, null))
                    setExistingCategories(categories);
                } catch (e) {
                    console.error(e);
                    toggleErrorMessage(true);
                }
            }

            if(searchBy === "origin") {
                    try {
                        const { data : { meals }} = await axios.get(buildRecipeApiEndpoint("originList", null, null, null))
                        setExistingOrigins(meals);
                    } catch (e) {
                        console.error(e);
                        toggleErrorMessage(true);
                    }
                }
            }

            showExistingSearchOptions();
            }, [searchBy]);

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
            {errorMessage && <span>The alternative search options are not available at the moment, please try again later of try another search option now.</span>}
        </>
    );
}

export default DisplayExistingSearchOptions;


