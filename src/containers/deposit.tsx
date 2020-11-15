import React, {useState} from "react";
import {ApolloError, MutationFunctionOptions} from "@apollo/client";
import Error from "../components/Error";


interface Props {
    submit(data: MutationFunctionOptions): void;
    close: React.Dispatch<React.SetStateAction<{show: boolean, account: any}>>
    account: string;
    loading: boolean;
    error: ApolloError;
    data: any
}
export function Deposit({close, account, submit, loading, error, data}: Props) {
    const [amount, setAmount] = useState(0)
    const [narration, setNarration] = useState("")

    function handleChange(event) {
        if (event.target.name === "amount") setAmount(event.target.value)
        if (event.target.name === "narration") setNarration(event.target.value)
    }

    if (error) return <Error error={error}/>

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
                            <h3 className="text-2xl font-semibold">
                                Wallet Deposit
                            </h3>
                            <button
                                onClick={() => close({show: false, account: null})}
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        { data?.createDeposit != null ? <div className="text-green-600 px-6 pt-2">Deposit was successful</div> : null}
                        <form action="" onSubmit={(e) => {e.preventDefault(); submit({ variables: {walletId: parseInt(account), amount: amount}})}}>
                            <div className="relative px-6 flex-auto">
                                <div className="my-4 text-gray-600 text-lg leading-relaxed w-full">
                                    <label htmlFor="">
                                        Amount
                                    </label>
                                    <input
                                        name="amount"
                                        type="number"
                                        required
                                        onChange={handleChange}
                                        className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                    />
                                </div>

                                <div className="my-4 text-gray-600 text-lg leading-relaxed w-full">
                                    <label htmlFor="">
                                        Narration
                                    </label>
                                    <textarea
                                        name="narration"
                                        required
                                        onChange={handleChange}
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
                                    Deposit
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