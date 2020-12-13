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
                        <div className="leading-5 font-medium text-gray-900">
                            <Link to={`/customers/${customer.id}`}>
                                {customer.name}
                            </Link>
                        </div>
                        <div className="leading-5 text-gray-500">
                            {customer.email}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                <div className="leading-5 text-gray-900">{customer.gender}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                <span
                    className="px-2 inline-flex leading-5">
                  {customer.phone}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <button>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                &nbsp;&nbsp;
                <button>
                    <svg className="w-6 h-6" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </td>
        </tr>
    )
}