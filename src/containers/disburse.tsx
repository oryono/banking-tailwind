import React, {useState} from "react";
import {ApolloError, gql, MutationFunctionOptions, useQuery} from "@apollo/client";
import {Money} from "../components/shared/money";
import {GET_CUSTOMER_WALLETS} from "./wallets";


interface Props {
    submit(data: MutationFunctionOptions<any, FormData>): void;
    close?: React.Dispatch<React.SetStateAction<any>>
    loading?: boolean;
    error?: ApolloError;
    loanDetails?: any;
    installments?: string;
}

interface FormData {
    disbursementAmount: number;
    loanAccountId: number;
    disbursementAccountId: number;
    loanStandingOrderAccountId: number;
    installments: string;
}

export function Disburse({close, loading, error, submit, loanDetails, installments}: Props) {
    const walletInfo = useQuery(GET_CUSTOMER_WALLETS, {variables: {customerId: parseInt(loanDetails.account.customer.id), matching: "Wallet: "}})

    const [wallets, setWallets] = useState([])

    const [form, setForm] = useState({disbursementAccountId: null, disbursementAmount: loanDetails.account.loanDetail.approvedAmount, loanAccountId: loanDetails.account.id, loanStandingOrderAccountId: null, installments: installments})

    React.useEffect(() => {
        if (!walletInfo.loading && walletInfo.data) {
            setWallets(walletInfo.data.accounts)
        }
    }, [walletInfo.data, walletInfo.loading])

    function handleChange(event) {
        const { name, value } = event.target;
        form[name] = value
        setForm({...form})
    }

    return (
        <div>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div
                            className="flex items-start justify-between px-6 py-4 border-b border-solid border-gray-300 rounded-t">
                            <h3 className="text-2xl font-semibold text-gray-700">
                                Disburse {loanDetails.account.name}
                            </h3>
                            <button
                                onClick={() => close(false)}
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        { error ? <div className="text-pink-300 px-6 pt-2">{error.message }</div> : null}
                        <form action="" onSubmit={(e) => {e.preventDefault(); submit({variables: {installments: form.installments, loanStandingOrderAccountId: parseInt(form.loanStandingOrderAccountId), loanAccountId: parseInt(form.loanAccountId), disbursementAmount: parseInt(form.disbursementAmount), disbursementAccountId: parseInt(form.disbursementAccountId)}})}}>
                            <div className="relative px-6 flex-auto">
                                <div className="ml-1 my-2 relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                    <label htmlFor="">
                                        <Money money={loanDetails.account.loanDetail.approvedAmount} color="text-green-600"/> will be disbursed. Where should funds be disbursed?
                                    </label>
                                    <select
                                        required
                                        onChange={handleChange}
                                        name="disbursementAccountId"
                                        className="my-1 block appearance-none border border-gray-200 text-gray-700 px-3 py-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                        <option value="">Select</option>

                                        {
                                            wallets.map(wallet => <option value={wallet.id} key={wallet.id}>{wallet.name}</option>)
                                        }
                                    </select>
                                </div>

                                <div className="my-2 ml-1 relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                    <label htmlFor="">
                                        Where will the funds be paid from?
                                    </label>
                                    <select
                                        required
                                        onChange={handleChange}
                                        name="loanStandingOrderAccountId"
                                        className="my-1 block appearance-none border border-gray-200 text-gray-700 px-3 py-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                        <option value="">Select</option>
                                        {
                                            wallets.map(wallet => <option value={wallet.id} key={wallet.id}>{wallet.name}</option>)
                                        }

                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-3 rounded-b">
                                <button
                                    className="bg-green-500 text-white active:bg-green-600 text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Disburse funds
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
        </div>
    )
}