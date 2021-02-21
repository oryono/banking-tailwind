import React from "react";

export function LoanProductRow({loanProduct}) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
                <span className="leading-5 text-gray-900">{loanProduct.name}</span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex ">
                              {loanProduct.interestMethod}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex ">
                                {loanProduct.interestRate}
                            </span>
            </td>
            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex ">
                                {loanProduct.paymentFrequency}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex ">
                                {loanProduct.arrearsPeriod}
                            </span>
            </td>
        </tr>
    )
}