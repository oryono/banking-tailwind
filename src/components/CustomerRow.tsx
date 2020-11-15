import { CustomerInterface} from "./customerList";
import React from "react";
import {Link} from "react-router-dom";

export function CustomerRow({customer}: {customer: CustomerInterface}) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full"
                             src="https://picsum.photos/200"
                             alt=""/>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm leading-5 font-medium text-gray-900">
                            <Link to={`/customers/${customer.id}`}>
                                {customer.name}
                            </Link>
                        </div>
                        <div className="text-sm leading-5 text-gray-500">
                            {customer.email}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">{customer.gender}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                <span
                    className="px-2 inline-flex text-xs leading-5 font-semibold text-green-800">
                  {customer.phone}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <button type="button" className="text-indigo-600 hover:text-indigo-900">Edit</button>
            </td>
        </tr>
    )
}