import React from "react";

export function Warning({message}: {message: string}) {
    return (
        <div className="flex bg-teal-100 h-screen">
            <div className="m-auto">
                <p>{message}</p>
            </div>
        </div>
    )
}