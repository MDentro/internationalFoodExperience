import React from "react";
import styles from "./RadioButton.module.css";

function RadioButton({label, type = "radio", id, name, onChange, children}) {
    return (
        <>
            <label
                htmlFor={label}
                className={styles["radio-button-title"]}
            >
                <input
                    className={styles["radio-button-title"]}
                    type={type}
                    id={id}
                    name={name}
                    onChange={onChange}
                />
                {children}
            </label>

        </>
    );
}

export default RadioButton;






