import React from "react";
import {Balance} from "../containers/balance";
import {formatCurrency} from "../utils/currency";

export function LoanRow({loan}) {
    function totalPrincipal(loan) {
        return loan.loanInstallments.reduce((sum, acc) => sum + parseFloat(acc.principal), 0)
    }

    return (
        <tr>
            <td className="pl-4 py-4 whitespace-no-wrap">
                <span className="leading-5 text-gray-900">{loan.name}</span>
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
                              <Balance accountId={parseInt(loan.id)}/>
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                {formatCurrency(totalPrincipal(loan))}
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
                              Approved
                            </span>
            </td>
        </tr>
    )
}