import React from "react";
import {QueryResult} from "@apollo/client";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {WalletProductsList} from "./walletProductsList";

export function WalletProductsPage({walletProductsInfo}: {walletProductsInfo: QueryResult}) {
    if (walletProductsInfo.loading) return <Loading message="Loading wallet products"/>
    if (walletProductsInfo.error) return <Error error={walletProductsInfo.error}/>

    return (
        <div>
            <div className="mb-2">
                <p className="font-bold text-2xl text-gray-700">Wallet Products</p>
            </div>
            <div>
                <WalletProductsList walletProducts={walletProductsInfo.data.walletProducts}/>
            </div>
        </div>
    )
}