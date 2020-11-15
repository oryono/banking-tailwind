import React from "react";
import {gql, useQuery} from "@apollo/client";
import Error from "../components/Error";
import {formatCurrency} from "../utils/currency";

const GET_ACCOUNT_DETAILS = gql`
    query getAccountDetails ($accountId: Int!){
        accountDetails(accountId: $accountId){
            balance
        }
    }
`;
export function Balance(props) {
    const {data, error, loading} = useQuery(GET_ACCOUNT_DETAILS, { fetchPolicy: "network-only", variables: { accountId: parseInt(props.accountId) }})

    if (loading) return <span>Loading...</span>
    if (error) return <Error error={error}/>
    return <span>{formatCurrency(data.accountDetails.balance)}</span>
}