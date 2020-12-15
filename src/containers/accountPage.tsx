import React from "react";
import {QueryResult} from "@apollo/client";
import Error from "../components/Error";
import {PuffLoader} from "react-spinners";
import {formatCurrency} from "../utils/currency";
import moment from "moment";
import {Entries} from "./entries";

export function AccountPage({accountInfo}: { accountInfo: QueryResult }) {
    if (accountInfo.loading) return (
        <div className="flex">
            <div className="m-auto flex flex-col justify-evenly items-center"><PuffLoader/><p
                className="text-gray-500">Loading account info...</p></div>
        </div>
    )
    if (accountInfo.error) return <Error error={accountInfo.error}/>
    return (
        <div>
            <div>
                <p className="font-bold text-2xl text-gray-700">Account Statement</p>
            </div>
            <Entries entries={accountInfo.data.entries}/>
        </div>
    )
}