import React from "react";
import {gql, useQuery} from "@apollo/client";
import {Loading} from "../../components/Loading";
import Error from "../../components/Error";
import {Monthly as MonthlyTotals} from "../../components/totals/monthly";

const GET_MONTHLY_TRANSACTIONS_QUERY = gql`
    query {
        monthlyTransactions{
            transactions
        }
    }
`

export function Monthly() {
    const {error, loading, data} = useQuery(GET_MONTHLY_TRANSACTIONS_QUERY)

    if (loading) return <Loading message="Loading monthly transactions"/>
    if (error) return <Error error={error}/>

    return <MonthlyTotals transactions={data.monthlyTransactions.transactions}/>
}