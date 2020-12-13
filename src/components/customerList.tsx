import React from "react";
import {CustomerRow} from "./CustomerRow";
import {QueryResult} from "@apollo/client";
import {Loading} from "./Loading";
import Error from "./Error";

export interface CustomerInterface {
    id: number;
    name: string;
    email: string;
    gender: string;
    phone: string;
}

export function CustomerList({customersInfo}: { customersInfo: QueryResult }) {
    if (customersInfo.loading) return <Loading message="Loading customers"/>
    if (customersInfo.error) return <Error error={customersInfo.error}/>
    return (
        // <div className="flex flex-col">
        //     <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        //         <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        //             <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        //                 <table className="min-w-full divide-y divide-gray-200">
        //                     <thead>
        //                     <tr>
        //                         <th className="px-6 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        //                             Name
        //                         </th>
        //                         <th className="px-6 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        //                             Gender
        //                         </th>
        //                         <th className="px-6 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        //                             Phone
        //                         </th>
        //                         <th className="px-6 py-4 bg-gray-50"/>
        //                     </tr>
        //                     </thead>
        //                     <tbody className="bg-white divide-y divide-gray-200">
        //                     {
        //                         customersInfo.data.customers.map(customer => <CustomerRow customer={customer} key={customer.id}/>)
        //                     }
        //                     </tbody>
        //                 </table>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Account
                        Gender
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"/>
                </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                {
                    customersInfo.data.customers.map(customer => <CustomerRow customer={customer} key={customer.id}/>)
                }
                </tbody>
            </table>
        </div>
    )
}