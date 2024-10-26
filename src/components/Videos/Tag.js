import React from "react";

export default function Tag({ children }) {
    return (
        <span className="text-xs px-2 py-1 text-sm rounded-md bg-gray-100 text-gray-700 font-bold">
            {children}
        </span>
    );
}