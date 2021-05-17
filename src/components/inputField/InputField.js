import React from "react";
import styles from "./InputField.module.css";

function InputField({ label, fieldRef, name, type, id }) {

    return (
        <article className={styles["input-label-field-combination"]}>
            <label
                htmlFor={id}
                className={styles["input-label"]}
            >
                {label}
            </label>
                <input
                    className={styles["input-field"]}
                    {...fieldRef}
                    name={name}
                    type={type}
                    id={id}
                />
        </article>
    );
}

export default InputField