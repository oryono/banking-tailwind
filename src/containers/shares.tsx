import React from "react";
import {gql, useQuery} from "@apollo/client";
import {PuffLoader} from "react-spinners";
import Error from "../components/Error";
import {ShareDetails} from "../components/ShareDetails";
import { withRouter } from "react-router-dom";
import {ShareList} from "../components/SharesList";

const GET_CUSTOMER_SHARES = gql`
    query getShares ($customerId: Int!)
    {
        getSharesInfo(customerId: $customerId) {
            totalValue
            count
            entries {
                id
                amount
                account{
                    accountNumber
                }
                insertedAt
                description
                runningBalance
                transactionReference
                type
            }
        }
    }
`

function Shares(props) {
    const {data, loading, error} = useQuery(GET_CUSTOMER_SHARES, {variables: {customerId: parseInt(props.customerId)}})

    if (loading) return (
        <div className="flex">
            <div className="m-auto flex flex-col justify-evenly items-center"><PuffLoader/><p className="text-gray-500">Loading chart...</p></div>
        </div>
    )

    if (error) return <Error error={error}/>

    return (
        <div className="shadow-lg p-4 rounded">
            <div>
                <p className="font-bold text-xl text-gray-700">Shares</p>
            </div>
            <ShareDetails details={data.getSharesInfo}/>
            <ShareList entries={data.getSharesInfo.entries}/>
        </div>
    )
}

export default withRouter(Shares)