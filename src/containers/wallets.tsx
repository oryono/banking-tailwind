import React, {useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {PuffLoader} from "react-spinners";
import Error from "../components/Error";
import {Link} from "react-router-dom";
import {Balance} from "./balance";

export const GET_CUSTOMER_WALLETS = gql`
    query getAccounts ($customerId: Int!){
        accounts(customerId: $customerId, matching: "Wallet"){
            accountNumber
            id
            name
        }
    }
`

export function Wallets(props) {
    const {data, loading, error} = useQuery(GET_CUSTOMER_WALLETS, {fetchPolicy: "network-only", variables: {customerId: parseInt(props.customerId)}})

    if (loading) return (
        <div className="flex">
            <div className="m-auto flex flex-col justify-evenly items-center"><PuffLoader/><p
                className="text-gray-500">Loading wallets...</p></div>
        </div>
    )

    if (error) return <Error error={error}/>

    return (
        <div className="shadow-lg p-4 rounded">
            <div className="flex justify-between">
                <p className="font-bold text-xl text-gray-700">Wallets</p>
                <span className="float-right">
                    <button type="button" onClick={() => props.showNewWalletModal(true)} className="p-1 focus:outline-none">
                        <span className="text-2xl">+</span>New Wallet
                    </button>
                </span>
            </div>

            {
                data.accounts.map(account => (
                    <div className="flex justify-between my-2 border-t" key={account.id}>
                        <div>
                            <div>
                                <p className="text-xl text-gray-600 inline"><Link className="hover:underline hover:text-blue-400" to={`/accounts/${account.id}`}>{account.name}</Link></p>
                            </div>
                            <div>
                                <p className="text-xl text-gray-400 inline">{account.accountNumber}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-end items-end">
                            <div className=""><Balance accountId={account.id}/></div>
                            <div className="flex space-x-2">
                                <span><button className="focus:outline-none " type="button" onClick={() => props.showDepositModal({show: true, account: account.id}) }><span className="hover:underline">Deposit</span></button></span>
                                <span><button className="focus:outline-none" type="button" onClick={() => props.showWithdrawalModal({show: true, account: account.id}) }><span className="hover:underline">Withdraw</span></button></span>
                                <span><button className="focus:outline-none">Transfer</button></span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}