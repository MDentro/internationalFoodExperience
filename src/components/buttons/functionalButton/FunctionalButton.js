import React from "react";
import styles from "./FunctionalButton.module.css"

function FunctionalButton({ children, handleClick, type }) {

    return (
        <button
            className={styles["functional-button"]}
            type={type}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}

export default FunctionalButton;




