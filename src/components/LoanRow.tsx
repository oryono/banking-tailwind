import React from "react";
import {Balance} from "../containers/balance";
import {formatCurrency} from "../utils/currency";
import {Link} from "react-router-dom"
import {Money} from "./shared/money";

export function LoanRow({loan}) {
    function totalPrincipal(loan) {
        return loan.loanInstallments.reduce((sum, acc) => sum + parseFloat(acc.principal), 0)
    }

    return (
        <tr>
            <td className="px-2 py-4 whitespace-no-wrap">
                <span className="leading-5 text-gray-900">
                    <Link className="hover:underline" to={`/loans/${loan.id}`}>{loan.name}</Link>
                </span>
            </td>

            <td className="px-2 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              {loan.accountNumber}
                            </span>
            </td>

            <td className="px-2 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              {loan.loanDetail.status === "Disbursed" ? <Balance accountId={parseInt(loan.id)}/> : "Not disbursed"}
                            </span>
            </td>

            <td className="px-2 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                <Money money={loan.loanDetail.totalPrincipal} color="text-green-600"/>
                            </span>
            </td>

            <td className="px-2 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                {loan.loanDetail.loanPeriod}
                            </span>
            </td>

            <td className="px-2 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                {loan.loanDetail.paymentFrequency}
                            </span>
            </td>

            <td className="px-2 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              {loan.loanDetail.status}
                            </span>
            </td>
        </tr>
    )
}