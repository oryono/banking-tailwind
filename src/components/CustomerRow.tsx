import {CustomerInterface} from "./customerList";
import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";

export function CustomerRow({customer}: { customer: CustomerInterface }) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                        <img className="h-12 w-12 rounded-full"
                             src="https://picsum.photos/200"
                             alt=""/>
                    </div>
                    <div className="ml-4">
                        <div className="leading-5 font-medium text-gray-900">
                            <Link className="hover:underline hover:text-blue-300" to={`/customers/${customer.id}`}>
                                {customer.name}
                            </Link>
                        </div>
                        <div className="leading-5 text-gray-500">
                            {customer.email}
                        </div>
                        <div
                            className="leading-5 text-gray-500">
                            {customer.phone}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                <div className="leading-5 text-gray-700 capitalize">{customer.gender}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap">
                <div className="leading-5 text-gray-700 capitalize">{customer.dob ? moment(customer.dob).format("MMM Do YY") : null}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                <div
                    className="">
                    <div className="leading-5 text-gray-700">{customer.parish}</div>
                    <div className="leading-5 text-gray-700">{customer.village}</div>
                    <div className="leading-5 text-gray-700">{customer.subCounty}</div>
                    <div className="leading-5 text-gray-700">{customer.county}</div>
                    <div className="leading-5 text-gray-700">{customer.district}</div>
                </div>
            </td>
        </tr>
    )
}