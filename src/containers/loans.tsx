import React from "react";
import {gql, useQuery} from "@apollo/client";
import {PuffLoader} from "react-spinners";
import Error from "../components/Error";
import {Link} from "react-router-dom";
import {Balance} from "./balance";

const GET_CUSTOMER_LOANS = gql`
    query getAccounts ($customerId: Int!){
        accounts(customerId: $customerId, matching: "Loan"){
            accountNumber
            id
            name
        }
    }
`

export function Loans(props) {
    const {data, loading, error} = useQuery(GET_CUSTOMER_LOANS, {variables: {customerId: parseInt(props.customerId)}})

    if (loading) return (
        <div className="flex">
            <div className="m-auto flex flex-col justify-evenly items-center"><PuffLoader/><p
                className="text-gray-500">Loading loans...</p></div>
        </div>
    )

    if (error) return <Error error={error}/>

    return (
        <div className="mt-4 shadow-lg p-4 rounded">
            <div className="flex justify-between">
                <p className="font-bold text-xl text-gray-700">Loans</p>
                <span>
                    <button type="button" onClick={props.setShowLoanApplicationModal}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                    </button>
                </span>
            </div>

            {
                data.accounts.map(account => (
                    <div className="flex justify-between my-2 border-t" key={account.id}>
                        <div>
                            <div>
                                <p className="text-xl text-gray-400 inline"><Link to={`/accounts/${account.id}`}>{account.name}</Link></p>
                            </div>
                            <div>
                                <p className="text-xl text-gray-400 inline">{account.accountNumber}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-end items-end">
                            <div className=""><Balance accountId={account.id}/></div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}