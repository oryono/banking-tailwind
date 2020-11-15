import React from "react";
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

export function Transactions() {
    const entriesInfo = useQuery(GET_ENTRIES_QUERY, {
        variables: {
            limit: 1000,
            offset: 0,
            transactionReference: "",
            transactionType: "credit",
            transactionDescription: "Deposit"
        }
    })
    return (
        <Nav>
            <TransactionsPage entriesInfo={entriesInfo}/>
        </Nav>
    )
}