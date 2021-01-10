import {QueryResult} from "@apollo/client";
import React from "react";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {AccountsList} from "./accountsList";

export function AccountsPage({accountsInfo}: {accountsInfo: QueryResult}) {
    if (accountsInfo.loading) return <Loading message="Loading transactions"/>
    if (accountsInfo.error) return <Error error={accountsInfo.error}/>
    return (
        <div className="mb-4">
            <div>
                <AccountsList accounts={accountsInfo.data.accounts}/>
            </div>
        </div>
    )
}