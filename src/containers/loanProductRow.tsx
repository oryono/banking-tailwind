import React from "react";

export function LoanProductRow({loanProduct}) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
                <span className="text-sm leading-5 text-gray-900">{loanProduct.name}</span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              {loanProduct.interestMethod}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                                {loanProduct.interestRate}
                            </span>
            </td>
            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                                {loanProduct.paymentFrequency}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                                {loanProduct.arearsPeriod}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                <button>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
            </td>
        </tr>
    )
}