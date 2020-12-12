import React from "react";
import {QueryResult} from "@apollo/client";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {WalletProductsList} from "./walletProductsList";

export function WalletProductsPage({walletProductsInfo}: { walletProductsInfo: QueryResult }) {
    if (walletProductsInfo.loading) return <Loading message="Loading wallet products"/>
    if (walletProductsInfo.error) return <Error error={walletProductsInfo.error}/>

    return (
        <div>
            <div className="mb-4">
                <p className="font-bold text-2xl text-gray-700 inline">Wallet Products</p>
                <span className="float-right">
                        <button type="button">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                        </button>
                    </span>
            </div>
            <div>
                <WalletProductsList walletProducts={walletProductsInfo.data.walletProducts}/>
            </div>
        </div>
    )
}