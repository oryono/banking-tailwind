import React from "react";
import {QueryResult} from "@apollo/client";
import {PuffLoader} from "react-spinners";
import Error from "../Error";
import {formatCurrency} from "../../utils/currency";

export function Transaction({type, transactionInfo}: {type?: string, transactionInfo?: QueryResult}) {
    if (transactionInfo.loading) {
        return (
            <div className="flex">
                <div className="m-auto flex flex-col justify-evenly items-center"><PuffLoader/><p className="text-gray-500">Loading chart...</p></div>
            </div>
        )
    }

    if (transactionInfo.error) {
        return <Error error={transactionInfo.error}/>
    }

    if (type === "Deposits") {
        return (
            <div className="m-auto flex flex-col justify-center items-center">
                <div><p className="text-4xl text-gray-700">{type}</p></div>
                <div><p className="text-3xl text-green-300">{formatCurrency(transactionInfo.data.getDepositsTotal.total)}</p></div>
            </div>
        )
    }

    if (type === "Withdraws") {
        return (
            <div className="m-auto flex flex-col justify-center items-center">
                <div><p className="text-4xl text-gray-700">{type}</p></div>
                <div><p className="text-3xl text-pink-300">{formatCurrency(transactionInfo.data.getWithdrawalsTotal.total)}</p></div>
            </div>
        )
    }

    if (type === "Transfers") {
        return (
            <div className="m-auto flex flex-col justify-center items-center">
                <div><p className="text-4xl text-gray-700">{type}</p></div>
                <div><p className="text-3xl text-gray-500">{formatCurrency(transactionInfo.data.getTransfersTotal.total)}</p></div>
            </div>
        )
    }

    if (type === "Loans Disbursed") {
        return (<div className="m-auto flex flex-col justify-center items-center">
            <div><p className="text-4xl text-gray-700">{type}</p></div>
            <div><p className="text-3xl text-gray-500">{ transactionInfo.data.getTotalDisbursements.total }</p></div>
        </div>)
    }

    if (type === "Outstanding") {
        return (<div className="m-auto flex flex-col justify-center items-center">
            <div><p className="text-4xl text-gray-700">{type}</p></div>
            <div><p className="text-3xl text-gray-500">{formatCurrency(transactionInfo.data.getTotalOutstandingPrincipal.total)}</p></div>
        </div>)
    }

    return (
        <div className="m-auto flex flex-col justify-center items-center">
            <div><p className="text-4xl text-gray-700">{type}</p></div>
            <div><p className="text-3xl text-gray-500">{formatCurrency(transactionInfo.data.getTotalAmountDisbursed.total)}</p></div>
        </div>
    )
}