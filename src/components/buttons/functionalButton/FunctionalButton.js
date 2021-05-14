import React from "react";

function FunctionalButton({ children, handleClick, type}) {

    return (
        <button
            type={type}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}

export default FunctionalButton;




