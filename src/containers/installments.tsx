import React from "react";
import {InstallmentRow} from "./installmentRow";

export function Installments({installments, scheduleTitle}) {
    return (
        <div>
            <div className="flex flex-col">
                <p className="py-2 font-bold text-lg text-gray-700 inline">{scheduleTitle}</p>
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-4">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-4">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50 text-left leading-4 font-medium text-gray-500 tracking-wider">
                                        Payment Number
                                    </th>
                                    <th className="px-3 py-4 bg-gray-50 text-left  leading-4 font-medium text-gray-500 tracking-wider">
                                        Installment
                                    </th>
                                    <th className="px-3 py-4 bg-gray-50 text-left  leading-4 font-medium text-gray-500 tracking-wider">
                                        Principal
                                    </th>
                                    <th className="px-3 py-4 bg-gray-50 text-left  leading-4 font-medium text-gray-500 tracking-wider">
                                        Interest
                                    </th>

                                    <th className="px-3 py-4 bg-gray-50 text-left  leading-4 font-medium text-gray-500 tracking-wider">
                                        balance
                                    </th>

                                    <th className="px-3 py-4 bg-gray-50 text-left  leading-4 font-medium text-gray-500 tracking-wider">
                                        Payment Date
                                    </th>
                                    <th className="px-3 py-4 bg-gray-50 text-left  leading-4 font-medium text-gray-500 tracking-wider">
                                        Cleared
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {installments?.map(installment => <InstallmentRow key={installment.paymentNumber} installment={installment}/>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}