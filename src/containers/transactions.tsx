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
    type: Type;
    description: Description;
}

export function Transactions() {
    const [filters, setFilters] = useState<Filter>({transactionReference: "", description: "Deposit", type: "credit"})
    const entriesInfo = useQuery(GET_ENTRIES_QUERY, {
        variables: {
            limit: 1000,
            offset: 0,
            transactionReference: filters.transactionReference,
            transactionType: filters.type,
            transactionDescription: filters.description
        }
    })
    return (
        <Nav>
            <TransactionsPage entriesInfo={entriesInfo} setFilters={setFilters}/>
        </Nav>
    )
}