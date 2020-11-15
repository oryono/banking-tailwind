import {QueryResult} from "@apollo/client";
import React from "react";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {LoanProductsList} from "./loanProductsList";

export function LoanProductsPage({loanProductsInfo}: {loanProductsInfo: QueryResult}) {
    if (loanProductsInfo.loading) return <Loading message="Loading wallet products"/>
    if (loanProductsInfo.error) return <Error error={loanProductsInfo.error}/>

    return <div>
        <div className="mb-2">
            <p className="font-bold text-2xl text-gray-700">Loan Products</p>
        </div>
        <div>
            <LoanProductsList loanProducts={loanProductsInfo.data.loanProducts}/>
        </div>
    </div>
}