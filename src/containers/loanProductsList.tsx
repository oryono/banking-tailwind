import React from "react";
import {LoanProductRow} from "./loanProductRow";

export function LoanProductsList({loanProducts}) {
    return (

        <div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50 text-left leading-4 font-medium text-gray-500 tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-3 py-4 bg-gray-50 text-left  leading-4 font-medium text-gray-500 tracking-wider">
                                        Interest Method
                                    </th>
                                    <th className="px-3 py-4 bg-gray-50 text-left  leading-4 font-medium text-gray-500 tracking-wider">
                                        Interest Rate
                                    </th>
                                    <th className="px-3 py-4 bg-gray-50 text-left  leading-4 font-medium text-gray-500 tracking-wider">
                                        Payment Frequency
                                    </th>

                                    <th className="px-3 py-4 bg-gray-50 text-left  leading-4 font-medium text-gray-500 tracking-wider">
                                        Arrears Period
                                    </th>

                                    <th className="px-3 py-4 bg-gray-50"/>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    loanProducts.map(loanProduct => <LoanProductRow loanProduct={loanProduct} key={loanProduct.id}/>)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}