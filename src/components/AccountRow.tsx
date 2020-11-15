import React from "react";
import {Balance} from "../containers/balance";

export function AccountRow({account}) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
                <span className="text-sm leading-5 text-gray-900">{account.accountNumber}</span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              {account.name}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              {account.type}
                            </span>
            </td>

            <td className="px-4 py-4 whitespace-no-wrap">
                            <span
                                className="px-2 inline-flex text-sm">
                              <Balance accountId={account.id} />
                            </span>
            </td>
        </tr>
    )
}