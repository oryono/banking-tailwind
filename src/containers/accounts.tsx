import React from "react";
import {Nav} from "../components/Nav";
import {gql, useQuery} from "@apollo/client";
import {AccountPage} from "./accountPage";
import {AccountsPage} from "./accountsPage";

const GET_ACCOUNTS_QUERY = gql`
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

export function Accounts() {
    const accountsInfo = useQuery(GET_ACCOUNTS_QUERY, {
        variables: {
            type: "liability",
            matching: "",
            clientId: parseInt(JSON.parse(localStorage.getItem("client")).id)
        }
    })
    return (
        <Nav>
            <AccountsPage accountsInfo={accountsInfo}/>
        </Nav>
    )
}