import React, {useState} from "react";
import {QueryResult} from "@apollo/client";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {Entries} from "./entries";


type Type = "credit" | "debit"
type Description = "Deposit"

interface Filter {
    transactionReference: string;
    type: Type;
    description: Description;
}

export function TransactionsPage({entriesInfo, setFilters}: { entriesInfo: QueryResult, setFilters }) {
    const [filters, setFilter] = useState<Filter>({transactionReference: "", description: "Deposit", type: "credit"})

    if (entriesInfo.loading) return <Loading message="Loading transactions"/>
    if (entriesInfo.error) return <Error error={entriesInfo.error}/>

    function handleChange(event) {
        const { name, value } = event.target;
        filters[name] = value
        setFilter({...filters})
        setFilters(filters)
    }



    return (
        <div className="mb-4">
            <div>
                <span className="font-bold text-2xl text-gray-700">Transactions</span>
                <span className="float-right">
                        <button type="button">
                            <svg className="w-6 h-6 inline-flex" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                            Filter
                        </button>
                    </span>
            </div>
            <div>
                <div className="py-4">
                    <form action="" className="flex justify-between">
                        <input type="text" autoFocus defaultValue={filters.transactionReference} name="transactionReference" onChange={handleChange} className="border-2 p-3 w-full focus:outline-none text-gray-600" placeholder="Transaction Reference"/>

                        <div className="flex w-full flex-wrap items-stretch">
                            <select
                                onChange={handleChange}
                                name="description"
                                value={filters.description}
                                className="appearance-none border text-gray-700 p-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                <option value="">Select Transaction Description</option>
                                <option value="Deposit">Deposits</option>
                                <option value="Withdrawal">Withdrawal</option>
                                <option value="Transfer">Transfer</option>
                                <option value="Disbursement">Disbursement</option>
                                <option value="Share Purchase">Share Purchase</option>
                                <option value="Loan Payment">Loan Payment</option>
                                <option value="Monthly Charge">Monthly Charge</option>
                                <option value="Deposit Fee">Deposit Fee</option>
                                <option value="Withdrawal Fee">Withdrawal Fee</option>
                            </select>
                        </div>
                        <div className="flex w-full flex-wrap items-stretch">
                            <select
                                onChange={handleChange}
                                name="type"
                                value={filters.type}
                                className="appearance-none border text-gray-700 p-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                <option value="">Select Transaction Type</option>
                                <option value="credit">Credit</option>
                                <option value="debit">Debit</option>
                            </select>
                        </div>
                    </form>
                </div>
                <Entries entries={entriesInfo.data.entries}/>
            </div>
        </div>
    )
}