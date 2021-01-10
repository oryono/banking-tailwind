import React, {useState} from "react";
import {Nav} from "../components/Nav";
import {gql, useQuery} from "@apollo/client";
import {AccountsPage} from "./accountsPage";

export const GET_ACCOUNTS_QUERY = gql`
    query getAccounts($type: String, $clientId: Int!, $matching: String) {
        accounts(type: $type, clientId: $clientId, matching: $matching) {
            id
            name
            accountNumber
            description
            type
        }
    }
`

type Type = "asset" | "liability" | "expense" | "income" | "equity"
interface Filter {
    matching: string;
    type: Type
}

export function Accounts() {
    const [filters, setFilters] = useState<Filter>({type: "liability", matching: ""})
    const accountsInfo = useQuery(GET_ACCOUNTS_QUERY, {
        variables: {
            type: filters.type,
            matching: filters.matching,
            clientId: parseInt(JSON.parse(localStorage.getItem("client")).id)
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
                    <span className="font-bold text-2xl text-gray-700">Accounts</span>
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
                <div className="py-2">
                    <form action="">
                        <div className="flex">
                            <div className="relative flex w-full flex-wrap items-stretch flex-2">
                                <input
                                    onChange={handleChange}
                                    name="matching"
                                    type="text"
                                    autoFocus
                                    defaultValue={filters.matching}
                                    placeholder="Search by account number or account name"
                                    className="appearance-none border p-3 relative focus:outline-none focus:shadow-outline-blue focus:border-blue-300 w-full"
                                />
                            </div>

                            <div className="relative flex w-full flex-wrap items-stretch">
                                <select
                                    name="type"
                                    value={filters.type}
                                    onChange={handleChange}
                                    className="block appearance-none border text-gray-700 p-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                    <option value="liability">Liability</option>
                                    <option value="asset">Asset</option>
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                    <option value="capital">Capital</option>
                                </select>
                            </div>
                        </div>

                    </form>

                </div>
            </div>

            <AccountsPage accountsInfo={accountsInfo}/>
        </Nav>
    )
}