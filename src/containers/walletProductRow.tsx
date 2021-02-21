import React from "react";
import {formatCurrency} from "../utils/currency";
import {Money} from "../components/shared/money";

export function WalletProductRow({walletProduct}) {
    return (
        <tr>
            <td className="pl-6 py-4 whitespace-no-wrap">
                <span className="leading-5 text-gray-900">{walletProduct.name}</span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              <Money money={walletProduct.monthlyCharge}/>
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                <Money money={walletProduct.minBalance}/>
                            </span>
            </td>
            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                <Money money={walletProduct.openingBalance}/>
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                {walletProduct.interestRate}
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                <Money money={walletProduct.depositFee}/>
                            </span>
            </td>

            <td className="pl-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                                <Money money={walletProduct.withdrawalFee}/>
                            </span>
            </td>
        </tr>
    )
}