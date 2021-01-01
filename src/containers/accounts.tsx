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
    return (
        <Nav>
            <AccountsPage accountsInfo={accountsInfo} setFilters={setFilters}/>
        </Nav>
    )
}