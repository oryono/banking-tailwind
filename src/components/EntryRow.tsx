import React from "react";
import {formatCurrency} from "../utils/currency";
import moment from "moment";

export function EntryRow({entry}) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
                <span className="text-sm leading-5 text-gray-900">{entry.transactionReference}</span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              {entry.description}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              {entry.account.name}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className={(entry.type === "credit" && entry.account.type === "liability") ? "text-green-600" : "text-red-500"}>
                                <span className={`px-2 inline-flex text-sm`}>
                                    {formatCurrency(entry.amount)}
                                </span>
                            </span>

            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              {formatCurrency(entry.runningBalance)}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              {moment(entry.insertedAt).format("MM/DD/YY HH:mm")}
                            </span>
            </td>
        </tr>
    )
}