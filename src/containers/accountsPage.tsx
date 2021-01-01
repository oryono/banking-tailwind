import {QueryResult} from "@apollo/client";
import React, {useState} from "react";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {AccountsList} from "./accountsList";

type Type = "asset" | "liability" | "expense" | "income" | "equity"
interface Filter {
    matching: string;
    type: Type
}
export function AccountsPage({accountsInfo, setFilters}: {accountsInfo: QueryResult, setFilters}) {
    const [filter, setFilter] = useState<Filter>({matching: "", type: "liability"})

    if (accountsInfo.loading) return <Loading message="Loading transactions"/>
    if (accountsInfo.error) return <Error error={accountsInfo.error}/>

    function handleChange(event) {
        const { name, value } = event.target;
        filter[name] = value
        setFilter({...filter})
        setFilters(filter)
    }
    return (
        <div className="mb-4">
            <p className="font-bold text-2xl text-gray-700">Accounts</p>
            <div className="shadow-lg p-4 rounded">
                <form action="">
                    <div className="flex">
                        <div className="relative flex w-full flex-wrap items-stretch flex-2 m-2">
                            <span
                                className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </span>
                            <input
                                onChange={handleChange}
                                name="matching"
                                type="text"
                                autoFocus
                                defaultValue={filter.matching}
                                placeholder="Name Matching..."
                                className="appearance-none border rounded px-1 py-1 relative focus:outline-none focus:shadow-outline-blue focus:border-blue-300 pl-8 w-full"
                            />
                        </div>

                        <div className="relative flex w-full flex-wrap items-stretch m-2">
                            <select
                                name="type"
                                onChange={handleChange}
                                className="block appearance-none border border-gray-200 text-gray-700 px-2 py-1 pr-8 rounded bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                <option value="liability">Liability</option>
                                <option value="asset">Asset</option>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                                <option value="capital">Capital</option>
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
            <div>
                <AccountsList accounts={accountsInfo.data.accounts}/>
            </div>
        </div>
    )
}