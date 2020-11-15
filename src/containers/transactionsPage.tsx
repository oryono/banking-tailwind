import React from "react";
import {QueryResult} from "@apollo/client";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {Entries} from "./entries";

export function TransactionsPage({entriesInfo}: { entriesInfo: QueryResult }) {
    if (entriesInfo.loading) return <Loading message="Loading transactions"/>
    if (entriesInfo.error) return <Error error={entriesInfo.error}/>
    return (
        <div className="mb-4">
            <p className="font-bold text-2xl text-gray-700">Transactions</p>
            <div>
                <Entries entries={entriesInfo.data.entries}/>
            </div>
        </div>
    )
}