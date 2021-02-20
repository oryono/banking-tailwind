import React, {useState} from "react";
import {Nav} from "../components/Nav";
import {gql, useQuery} from "@apollo/client";
import {TransactionsPage} from "./transactionsPage";

const GET_ENTRIES_QUERY = gql`
    query getEntries($limit: Int!, $offset: Int!, $transactionReference: String, $transactionType: String, $transactionDescription: String){
        entries(limit: $limit, offset: $offset, transactionDescription: $transactionDescription, transactionReference: $transactionReference, transactionType: $transactionType) {
            id
            amount
            type
            description
            account{
                type
                name
            }
            insertedAt
            runningBalance
            transactionReference
        }
    }
`

type Type = "credit" | "debit"
type Description = "Deposit"

interface Filter {
    transactionReference: string;
    description: Description;
}

export function Transactions() {
    const [filters, setFilters] = useState<Filter>({transactionReference: "", description: "Deposit"})
    const entriesInfo = useQuery(GET_ENTRIES_QUERY, {
        variables: {
            limit: 100,
            offset: 0,
            transactionReference: filters.transactionReference,
            transactionDescription: filters.description
        }
    })

    function handleChange(event) {
        const { name, value } = event.target;
        filters[name] = value
        setFilters({...filters})
    }

    return (
        <Nav>
            <div>
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
                        {/*<div className="flex w-full flex-wrap items-stretch">*/}
                        {/*    <select*/}
                        {/*        onChange={handleChange}*/}
                        {/*        name="type"*/}
                        {/*        value={filters.type}*/}
                        {/*        className="appearance-none border text-gray-700 p-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">*/}
                        {/*        <option value="">Select Transaction Type</option>*/}
                        {/*        <option value="credit">Credit</option>*/}
                        {/*        <option value="debit">Debit</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                    </form>
                </div>
            </div>
            <TransactionsPage entriesInfo={entriesInfo} setFilters={setFilters}/>
        </Nav>
    )
}