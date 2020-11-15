import React from "react";
import {formatCurrency} from "../utils/currency";

export function ShareDetails(props) {
    return (
        <div className="border-t">
            <div className="">
                <p className="text-xl text-gray-400 inline">Number of Shares:</p>
                <p className="text-xl text-gray-600 inline ml-2 float-right">{props.details.count}</p>
            </div>
            <div className="">
                <p className="text-xl text-gray-400 inline">Value of Shares:</p>
                <p className="text-xl text-gray-600 inline ml-2 text-green-600 float-right">{formatCurrency(props.details.totalValue)}</p>
            </div>
        </div>
    )
}