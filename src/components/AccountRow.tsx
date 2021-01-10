import React from "react";
import {Balance} from "../containers/balance";

export function AccountRow({account}) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
                <span className="leading-5 text-gray-900">{account.accountNumber}</span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              <a className="hover:underline" href={`/accounts/${account.id}`}>{account.name}</a>
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex capitalize">
                              {account.type}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex">
                              <Balance accountId={account.id} />
                            </span>
            </td>
        </tr>
    )
}