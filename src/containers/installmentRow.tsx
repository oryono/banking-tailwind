import React from "react";
import {formatCurrency} from "../utils/currency";

export function InstallmentRow({installment}) {
    return (
        <tr>
            <td className="pl-6 py-4 whitespace-no-wrap">
                <span className="leading-5 text-gray-900">{installment.paymentNumber}</span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              {formatCurrency(installment.monthlyPayment)}
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                {formatCurrency(installment.principal)}
                            </span>
            </td>
            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                {formatCurrency(installment.interest)}
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                {formatCurrency(installment.balance)}
                            </span>
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