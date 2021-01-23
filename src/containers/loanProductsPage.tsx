import {QueryResult} from "@apollo/client";
import React from "react";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {LoanProductsList} from "./loanProductsList";

export function LoanProductsPage({loanProductsInfo, setShowLoanProductModal}: {loanProductsInfo: QueryResult, setShowLoanProductModal: React.Dispatch<boolean>}) {
    if (loanProductsInfo.loading) return <Loading message="Loading wallet products"/>
    if (loanProductsInfo.error) return <Error error={loanProductsInfo.error}/>

    return <div>
        <div className="mb-4">
            <p className="font-bold text-2xl text-gray-700 inline">Loan Products</p>
            <span className="float-right">
                        <button type="button" className="focus:outline-none" onClick={() => setShowLoanProductModal(true)}>
                            <span className="text-2xl">+</span> <span>New Loan Product</span>
                        </button>
                    </span>
        </div>
        <div>
            <LoanProductsList loanProducts={loanProductsInfo.data.loanProducts}/>
        </div>
    </div>
}