import React from "react";
import PuffLoader from "react-spinners/PuffLoader"

export function Loading({message}: {message?: string}) {
    return (
        <div className="flex h-screen">
            <div className="m-auto flex flex-col justify-evenly items-center">
                <PuffLoader/>
                <p>{message}</p>
            </div>
        </div>
    )
}