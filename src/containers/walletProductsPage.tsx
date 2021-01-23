import React from "react";
import {QueryResult} from "@apollo/client";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {WalletProductsList} from "./walletProductsList";

export function WalletProductsPage({walletProductsInfo, setShowNewWalletProductModal}: { walletProductsInfo: QueryResult,  setShowNewWalletProductModal: React.Dispatch<boolean>}) {
    if (walletProductsInfo.loading) return <Loading message="Loading wallet products"/>
    if (walletProductsInfo.error) return <Error error={walletProductsInfo.error}/>

    return (
        <div>
            <div className="mb-4">
                <p className="font-bold text-2xl text-gray-700 inline">Wallet Products</p>
                <span className="float-right">
                        <button type="button" className="focus:outline-none" onClick={() => setShowNewWalletProductModal(true)}>
                            <span className="text-2xl">+</span> <span>New Wallet Product</span>
                        </button>
                    </span>
            </div>
            <div>
                <WalletProductsList walletProducts={walletProductsInfo.data.walletProducts}/>
            </div>
        </div>
    )
}