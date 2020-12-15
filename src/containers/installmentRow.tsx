import React from "react";
import {formatCurrency} from "../utils/currency";
import {Money} from "../components/shared/money";

export function InstallmentRow({installment}) {
    return (
        <tr>
            <td className="pl-6 py-4 whitespace-no-wrap">
                <span className="leading-5 text-gray-900">{installment.paymentNumber}</span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                <Money money={installment.monthlyPayment}/>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                <Money money={installment.principal}/>
            </td>
            <td className="pl-4 py-4 whitespace-no-wrap">
                <Money money={installment.interest}/>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                <Money money={installment.balance}/>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                {installment.paymentDate}
                            </span>
            </td>
        </tr>
    )
}