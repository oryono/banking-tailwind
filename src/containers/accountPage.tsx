import React from "react";
import {QueryResult} from "@apollo/client";
import Error from "../components/Error";
import {PuffLoader} from "react-spinners";
import {formatCurrency} from "../utils/currency";
import moment from "moment";

export function AccountPage({accountInfo}: { accountInfo: QueryResult }) {
    if (accountInfo.loading) return (
        <div className="flex">
            <div className="m-auto flex flex-col justify-evenly items-center"><PuffLoader/><p
                className="text-gray-500">Loading account info...</p></div>
        </div>
    )
    if (accountInfo.error) return <Error error={accountInfo.error}/>
    return (
        <div>
            <div>
                <p className="font-bold text-2xl text-gray-700">Account Statement</p>
            </div>
            <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                    <tr>
                        <th className="px-6 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Reference
                        </th>
                        <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Account
                        </th>
                        <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Running Balance
                        </th>

                        <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Time
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {accountInfo.data.entries.map(entry => (<tr>
                        <td className="px-6 py-4 whitespace-no-wrap">
                            <span className="text-sm leading-5 text-gray-900">{entry.transactionReference}</span>
                        </td>

                        <td className="px-2 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              {entry.description}
                            </span>
                        </td>

                        <td className="px-2 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              {entry.account.name}
                            </span>
                        </td>

                        <td className="px-2 py-4 whitespace-no-wrap">
                            <span className={(entry.type === "credit" && entry.account.type === "liability") ? "text-green-600" : "text-red-500"}>
                                <span className={`px-2 inline-flex text-sm`}>
                                    {formatCurrency(entry.amount)}
                                </span>
                            </span>

                        </td>

                        <td className="px-2 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              {formatCurrency(entry.runningBalance)}
                            </span>
                        </td>

                        <td className="px-2 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              { moment(entry.inserted_at).format("MM/DD/YY HH:mm")}
                            </span>
                        </td>
                    </tr>))}
                    </tbody>

                </table>

            </div>
        </div>
    )
}