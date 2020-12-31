import React from "react";
import {Money} from "../components/shared/money";
import moment from "moment";

export function InstallmentRow({installment}) {
    return (
        <tr>
            <td className="pl-6 py-4 whitespace-no-wrap">
                <span className="leading-5 text-gray-900">{installment.paymentNumber}</span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                {installment.id ? <Money money={installment.monthlyPayment}/> : <Money money={installment.payment}/>}
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                {installment.id ? <Money money={installment.principal}/> : <Money money={installment.principalPayment}/>}
            </td>
            <td className="pl-4 py-4 whitespace-no-wrap">

                {installment.id ? <Money money={installment.interest}/> : <Money money={installment.interestPayment}/>}
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">

                {installment.id ? <Money money={installment.balance}/> : <Money money={installment.principalBalance}/>}
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                {moment(installment.paymentDate).format("MM/DD/YY")}
                            </span>
            </td>
        </tr>
    )
}