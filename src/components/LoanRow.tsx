import React from "react";
import {Balance} from "../containers/balance";
import {formatCurrency} from "../utils/currency";
import {Link} from "react-router-dom"

export function LoanRow({loan}) {
    function totalPrincipal(loan) {
        return loan.loanInstallments.reduce((sum, acc) => sum + parseFloat(acc.principal), 0)
    }

    return (
        <tr>
            <td className="pl-4 py-4 whitespace-no-wrap">
                <span className="leading-5 text-gray-900">
                    <Link className="hover:underline" to={`/loans/${loan.id}`}>{loan.name}</Link>
                </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              {loan.accountNumber}
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              {loan.loanDetail.status === "Disbursed" ? <Balance accountId={parseInt(loan.id)}/> : "Not disbursed"}
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-green-600">
                                {formatCurrency(loan.loanDetail.totalPrincipal)}
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                {loan.loanInstallments.length}
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              {loan.customer.name}
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              {loan.loanDetail.status}
                            </span>
            </td>
        </tr>
    )
}