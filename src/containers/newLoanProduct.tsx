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

type PaymentFrequency = "Weekly" | "Monthly"

interface FormData {
    name: string;
    arrearsPeriod: string;
    paymentFrequency: PaymentFrequency;
    interestRate: string;
    penaltyRate: string;
    type: string;
    interestMethod: string;
}

export function NewLoanProduct({submit, close, loading, error, data}: Props) {
    const client = JSON.parse(localStorage.getItem("client"))
    const [form, setForm] = useState<FormData>({
        penaltyRate: "",
        interestRate: "",
        name: "",
        arrearsPeriod: "",
        paymentFrequency: "Monthly",
        interestMethod: "Declining Balance",
        type: "Standard"
    })

    function handleChange(event) {
        const {name, value} = event.target;
        form[name] = value
        setForm({...form})
    }

    if (data?.createLoanProduct) {
        const properties = {
            message: `Creation of loan product ${form.name} was successful.`,
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
                                New Loan Product
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
                        {error ? <div className="text-pink-300 px-6 pt-2">{error.message}</div> : null}
                        <form action="" onSubmit={(e) => {
                            e.preventDefault();
                            submit({
                                variables: {
                                    clientId: parseInt(client.id),
                                    penaltyRate: parseFloat(form.penaltyRate),
                                    interestRate: parseFloat(form.interestRate),
                                    name: form.name,
                                    arrearsPeriod: parseInt(form.arrearsPeriod),
                                    paymentFrequency: form.paymentFrequency,
                                    type: form.type,
                                    interestMethod: form.interestMethod,
                                }
                            })
                        }}>
                            <div className="relative px-6 flex-auto">
                                <div className="mb-2 text-gray-600 text-lg leading-relaxed w-full mr-1">
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

                                <div className="mb-2 text-gray-600 text-lg leading-relaxed w-full">
                                    <label htmlFor="">
                                        Arrears Period
                                    </label>
                                    <input
                                        value={form.arrearsPeriod}
                                        onChange={handleChange}
                                        name="arrearsPeriod"
                                        type="number"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                                    />
                                </div>

                                <div className="relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                    <label htmlFor="">
                                        Payment Frequency
                                    </label>
                                    <select
                                        value={form.paymentFrequency}
                                        onChange={handleChange}
                                        required
                                        name="paymentFrequency"
                                        className="block appearance-none border border-gray-200 text-gray-700 px-3 py-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                        <option value="Monthly">Monthly</option>
                                        <option value="Weekly">Weekly</option>
                                    </select>
                                </div>

                                <div className="flex">
                                    <div className="mb-2 text-gray-600 text-lg leading-relaxed w-full mr-1">
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

                                    <div className="mb-2 text-gray-600 text-lg leading-relaxed w-full">
                                        <label htmlFor="">
                                            Penalty Rate
                                        </label>
                                        <input
                                            value={form.penaltyRate}
                                            onChange={handleChange}
                                            name="penaltyRate"
                                            type="number"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                                        />
                                    </div>
                                </div>


                                <div className="flex">
                                    <div className="my-3 relative flex w-full flex-wrap text-gray-600 text-lg mr-1">
                                        <label htmlFor="">
                                            Account Type
                                        </label>
                                        <select
                                            value={form.type}
                                            onChange={handleChange}
                                            required
                                            name="type"
                                            className="block appearance-none border border-gray-200 text-gray-700 px-3 py-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                            <option value="Standard">Standard</option>
                                        </select>
                                    </div>

                                    <div className="my-3 relative flex w-full flex-wrap text-gray-600 text-lg">
                                        <label htmlFor="">
                                            Interest Calculation Method
                                        </label>
                                        <select
                                            onChange={handleChange}
                                            required
                                            value={form.interestMethod}
                                            name="interestMethod"
                                            className="block appearance-none border border-gray-200 text-gray-700 px-3 py-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                            <option value="Standard">Declining Balance</option>
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