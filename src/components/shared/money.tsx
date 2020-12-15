import {formatCurrency} from "../../utils/currency";
import React from "react";

interface Props {
    money: number;
    color?: string
}
export function Money({money, color}: Props) {
    return (
        <span className={`px-2 inline-flex ${color ? color : "text-gray-600"}`}>
             {formatCurrency(money)}
        </span>
    )
}