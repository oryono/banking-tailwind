import {QueryResult} from "@apollo/client";
import React from "react";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {LoanProductsList} from "./loanProductsList";

export function LoanProductsPage({loanProductsInfo}: {loanProductsInfo: QueryResult}) {
    if (loanProductsInfo.loading) return <Loading message="Loading wallet products"/>
    if (loanProductsInfo.error) return <Error error={loanProductsInfo.error}/>

    return <div>
        <div className="mb-4">
            <p className="font-bold text-2xl text-gray-700 inline">Loan Products</p>
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
            <LoanProductsList loanProducts={loanProductsInfo.data.loanProducts}/>
        </div>
    </div>
}