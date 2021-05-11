import React from "react";

function InputField({ label, fieldRef, name, type, id }) {

    return (
        <>
            <label htmlFor={id}>{label}</label>
                <input
                    className="input-field"
                    {...fieldRef}
                    name={name}
                    type={type}
                    id={id}
                />
        </>
    );
}

export default InputField