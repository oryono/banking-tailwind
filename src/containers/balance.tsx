import React from "react";
import {gql, useQuery} from "@apollo/client";
import Error from "../components/Error";
import {Money} from "../components/shared/money";

const GET_ACCOUNT_DETAILS = gql`
    query getAccountDetails ($accountId: Int!){
        accountDetails(accountId: $accountId){
            balance
        }
    }
`;
export function Balance(props) {
    const {data, error, loading, refetch} = useQuery(GET_ACCOUNT_DETAILS, { fetchPolicy: "network-only", variables: { accountId: parseInt(props.accountId) }})

    React.useEffect(() => {
        if (props.refetchBalance) {
            console.log("Getting balance")
            refetch()
        }
    }, [props.refetchBalance, refetch])

    if (loading) return <span>Loading...</span>
    if (error) return <Error error={error}/>
    return <span className="text-lg ">
        <Money money={data.accountDetails.balance} color="text-green-600"/>
    </span>
}