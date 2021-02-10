import React from "react";
import moment from "moment";
import {Money} from "./shared/money";
import {titleCase} from "../utils/cases";

export function EntryRow({entry}) {
    function computeColorClass(entry) {
        if ((entry.type === "credit" && entry.account.type === "liability") || (entry.type === "debit" && entry.account.type === "asset")) {
            return "text-green-600"
        }

        if ((entry.type === "debit" && entry.account.type === "liability") || (entry.type === "credit" && entry.account.type === "asset")) {
            return "text-red-500"
        }
    }

    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
                <span className="leading-5 text-gray-900">{entry.transactionReference}</span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              {titleCase(entry.description)}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              {entry.account.name}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                                <span className={`px-2 inline-flex`}>
                                    <Money money={entry.amount} color={computeColorClass(entry)}/>
                                </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                <Money money={entry.runningBalance}/>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              {moment(entry.insertedAt).format("ddd, MMM Do, YY HH:mm")}
                            </span>
            </td>
        </tr>
    )
}