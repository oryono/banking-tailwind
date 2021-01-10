import {QueryResult} from "@apollo/client";
import React from "react";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {Loans} from "../components/Loans";

interface Filter {
    filter: string;
    loanStatus: string;
}

export function LoansPage({loansInfo}: { loansInfo: QueryResult }) {
    if (loansInfo.loading) return <Loading message="Loading loans..."/>
    if (loansInfo.error) return <Error error={loansInfo.error}/>
    return (
        <div>
            <Loans loans={loansInfo.data.accounts}/>
        </div>
    )
}