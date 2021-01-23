import React, {useState} from "react";
import {ApolloError, MutationFunctionOptions} from "@apollo/client";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

interface Props {
    submit(data: MutationFunctionOptions<any, any>): void;
    close: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean;
    error: ApolloError;
    data: any
}

type AccountType = "Standard" | "Fixed"

interface FormData {
    depositFee: string;
    withdrawalFee: string;
    openingBalance: string;
    interestRate: string;
    name: string;
    monthlyCharge: string;
    minBalance: string;
    type: AccountType
}
export function NewWalletProduct({loading, close, error, submit, data}: Props) {
    const client = JSON.parse(localStorage.getItem("client"))
    const [form, setForm] = useState<FormData>({interestRate: "", depositFee: "", monthlyCharge: "", name: "", openingBalance: "", type: "Standard", withdrawalFee: "", minBalance: ""})

    function handleChange(event) {
        const { name, value } = event.target;
        form[name] = value
        setForm({...form})
    }

    if (data?.createWalletProduct) {
        const properties = {
            message: `Creation of wallet product ${form.name} was successful.`,
            type: "success"
        }
        cookies.set('toastProperties', JSON.stringify(properties), {path: '/'});
        window.location.reload();
    }

    return (
        <div>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-2/5 my-6 mx-auto max-w-3xl fixed">
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div
                            className="flex items-start justify-between px-6 py-4 border-b border-solid border-gray-300 rounded-t">
                            <h3 className="text-2xl font-semibold text-gray-700">
                                New Wallet Product
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
                        <form action="" onSubmit={(e) => {e.preventDefault(); submit({variables: {clientId: parseInt(client.id), minBalance: parseFloat(form.minBalance), type: form.type, withdrawalFee: parseInt(form.withdrawalFee), depositFee: parseInt(form.depositFee), monthlyCharge: parseInt(form.monthlyCharge), openingBalance: parseInt(form.openingBalance), name: form.name, interestRate: parseFloat(form.interestRate)}})}}>
                            <div className="relative px-6 flex-auto">
                                <div className="flex">
                                    <div className="my-4 text-gray-600 text-lg leading-relaxed w-full mr-1">
                                        <label htmlFor="">
                                            Product Name
                                        </label>
                                        <input
                                            value={form.name}
                                            onChange={handleChange}
                                            name="name"
                                            type="text"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                                        />
                                    </div>

                                    <div className="my-4 text-gray-600 text-lg leading-relaxed w-full">
                                        <label htmlFor="">
                                            Opening Balance
                                        </label>
                                        <input
                                            value={form.openingBalance}
                                            onChange={handleChange}
                                            name="openingBalance"
                                            type="number"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                                        />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="my-2 text-gray-600 text-lg leading-relaxed w-full mr-1">
                                        <label htmlFor="">
                                            Monthly Charge
                                        </label>
                                        <input
                                            value={form.monthlyCharge}
                                            onChange={handleChange}
                                            name="monthlyCharge"
                                            type="number"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                                        />
                                    </div>

                                    <div className="my-2 text-gray-600 text-lg leading-relaxed w-full">
                                        <label htmlFor="">
                                            Minimum Balance
                                        </label>
                                        <input
                                            value={form.minBalance}
                                            onChange={handleChange}
                                            name="minBalance"
                                            type="number"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                                        />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="my-2 text-gray-600 text-lg leading-relaxed w-full mr-1">
                                        <label htmlFor="">
                                            Deposit Fee
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            name="depositFee"
                                            value={form.depositFee}
                                            type="number"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                                        />
                                    </div>

                                    <div className="my-2 text-gray-600 text-lg leading-relaxed w-full">
                                        <label htmlFor="">
                                            Withdrawal Fee
                                        </label>
                                        <input
                                            value={form.withdrawalFee}
                                            onChange={handleChange}
                                            name="withdrawalFee"
                                            type="number"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                                        />
                                    </div>

                                </div>

                                <div className="flex">
                                    <div className="my-2 text-gray-600 text-lg leading-relaxed w-full">
                                        <label htmlFor="">
                                            Interest Rate
                                        </label>
                                        <input
                                            value={form.interestRate}
                                            onChange={handleChange}
                                            name="interestRate"
                                            type="number"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                                        />
                                    </div>

                                    <div className="my-2 relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                        <label htmlFor="">
                                            Account Type
                                        </label>
                                        <select
                                            onChange={handleChange}
                                            required
                                            value={form.type}
                                            name="type"
                                            className="block appearance-none border border-gray-200 text-gray-700 px-3 py-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                            <option value="">Select</option>
                                            <option value="Standard">Standard</option>
                                            <option value="Fixed">Fixed</option>
                                        </select>
                                    </div>
                                </div>


                            </div>
                            <div className="flex items-center justify-end p-3 rounded-b">
                                <button
                                    disabled={loading}
                                    className="bg-green-500 text-white active:bg-green-600 text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="submit"
                                >
                                    Create Product
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