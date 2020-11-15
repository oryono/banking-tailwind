import {QueryResult} from "@apollo/client";
import React from "react";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {Loans} from "../components/Loans";

export function LoansPage({loansInfo}: {loansInfo: QueryResult}) {
    if (loansInfo.loading) return <Loading message="Loading loans..."/>
    if (loansInfo.error) return <Error error={loansInfo.error}/>
    return (
        <div>
            <div>
                <p className="font-bold text-2xl text-gray-700">Loans</p>
            </div>
            <div>
                <Loans loans={loansInfo.data.accounts}/>
            </div>
        </div>
    )
}