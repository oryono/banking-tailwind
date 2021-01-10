import React from "react";
import {Nav} from "../components/Nav";
import {gql, useQuery} from "@apollo/client";
import {AccountPage} from "./accountPage";
import {withRouter} from "react-router-dom";

const GET_ENTRIES_QUERY = gql`
    query getEntries($accountId: Int, $limit: Int!, $offset: Int, $transactionType: String, $transactionDescription: String, $transactionReference: String) {
        entries(accountId: $accountId, limit: $limit, offset: $offset, transactionType: $transactionType, transactionDescription: $transactionDescription, transactionReference: $transactionReference) {
            amount
            account{
                id
                name
                type
                customer {
                    id
                    name
                }
            }
            description
            transactionReference
            runningBalance
            id
            type
            insertedAt
        }
    }
`;

function Account(props) {
    const accountId = props.match.params.id
    const accountInfo = useQuery(GET_ENTRIES_QUERY, {variables: {accountId: parseInt(accountId), limit: 1000}})
    return (
        <Nav>
            <div>
                <AccountPage accountInfo={accountInfo}/>
            </div>
        </Nav>
    )
}

export default withRouter(Account)