import React from 'react';
import styles from "./CategoryCard.module.css"

function CategoryCard({label, img, imgDescription, title}) {
    return (
        <section className={label}>
            <article>
                {img && <img className={styles["category-image"]} src={img} alt={imgDescription}/>}
                <p className={styles["category-title"]}>{title}</p>
            </article>
        </section>
    );
}

export default CategoryCard;