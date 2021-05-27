import React, {useState, useEffect} from "react";
import axios from "axios";
import buildRecipeUrlEndpoint from "../../helpers/buildRecipeUrlEndpoint";
import styles from "./DisplayExistingSearchOptions.module.css"

function DisplayExistingSearchOptions({searchBy}) {
    const [existingCategories, setExistingCategories] = useState([]);
    const [existingOrigins, setExistingOrigins] = useState([]);
    const [errorMessage, toggleErrorMessage] = useState(false);

    useEffect(() => {
        toggleErrorMessage(false);
        setExistingCategories([]);
        setExistingOrigins([]);

        async function showExistingSearchOptions() {
            if (searchBy === "category") {
                try {
                    const {data: {categories}} = await axios.get(buildRecipeUrlEndpoint("categoryList", null, null, null))
                    setExistingCategories(categories);
                } catch (e) {
                    console.error(e);
                    toggleErrorMessage(true);
                }
            }

            if (searchBy === "origin") {
                try {
                    const {data: {meals}} = await axios.get(buildRecipeUrlEndpoint("originList", null, null, null))
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
            {existingCategories &&

            <section className={styles["existing-search-options"]}>
                <ul>{existingCategories && existingCategories.map((existingCategorie) => {
                    return <li key={existingCategorie.strCategory}>{existingCategorie.strCategory}</li>
                })}</ul>
            </section>
            }

            {existingOrigins &&

            <section className={styles["existing-search-options"]}>
                <ul>{existingOrigins && existingOrigins.map((existingOrigin) => {
                    return <li key={existingOrigin.strArea}>{existingOrigin.strArea}</li>
                })}</ul>
            </section>
            }
            {errorMessage &&
            <span className={styles.error}>The alternative search options are not available at the moment, please try again later of try another search option now.</span>}
        </>
    );
}

export default DisplayExistingSearchOptions;


