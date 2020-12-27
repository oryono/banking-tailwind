import React, {useState} from "react";
import {ApolloError, MutationFunctionOptions} from "@apollo/client";
import {Money} from "../components/shared/money";


interface Props {
    // submit(data: MutationFunctionOptions): void;
    close?: React.Dispatch<React.SetStateAction<any>>
    loading?: boolean;
    error?: ApolloError;
    loanDetails: any
}
export function Approve({close, loading, error, loanDetails}: Props) {
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
                                Approve {loanDetails.account.name}
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
                        <form action="" onSubmit={(e) => {e.preventDefault();}}>
                            <div className="relative px-6 flex-auto">
                                <div className="my-4 text-gray-600 text-lg leading-relaxed w-full">
                                    <label htmlFor="">
                                        How much would you like to approve?
                                    </label>
                                    <p className="text-sm text-gray-500">You can approve upto <Money money={loanDetails.account.loanDetail.totalPrincipal} color="text-green-600"/></p>
                                    <input
                                        name="amount"
                                        type="number"
                                        defaultValue={loanDetails.account.loanDetail.totalPrincipal}
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                                    />
                                </div>

                                <div className="my-4 text-gray-600 text-lg leading-relaxed w-full">
                                    <label htmlFor="">
                                        Justification
                                    </label>
                                    <textarea
                                        name="narration"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-3 rounded-b">
                                <button
                                    className="bg-green-500 text-white active:bg-green-600 text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Approve
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