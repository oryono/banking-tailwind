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

    return (
        <div className="mb-4">
            <div>
                <Entries entries={entriesInfo.data.entries}/>
            </div>
        </div>
    )
}