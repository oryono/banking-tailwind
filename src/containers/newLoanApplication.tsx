import React, {useState} from "react";
import {ApolloError, gql, MutationFunctionOptions, useQuery} from "@apollo/client";
import {formatCurrency} from "../utils/currency";

import Cookies from 'universal-cookie';

const cookies = new Cookies();


const GET_LOAN_PRODUCTS_QUERY = gql`
    query getLoanProducts($clientId: Int!) {
        loanProducts(clientId: $clientId) {
            id
            name
        }
    }
`

const GET_LOAN_PRODUCT_QUERY = gql`
    query getLoanProduct($loanProductId: Int!) {
        loanProduct(loanProductId: $loanProductId) {
            interestRate
            arrearsPeriod
            paymentFrequency
            interestMethod
            name
            id
        }
    }
`

type Purpose = "Asset Finance" | "Education" | "Agriculture" | "Other"

interface FormData {
    loanAmount: string;
    loanDuration: string;
    loanPurpose: Purpose;
    clientId: number;
    customerId: number;
    loanProductId: string;
    installments?: string;
}

interface Props {
    submit(data: MutationFunctionOptions): void;

    close: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean;
    error: ApolloError;
    customerId: number;
    data: any

}

export function NewLoanApplication({customerId, submit, loading, close, error, data}: Props) {
    const client = JSON.parse(localStorage.getItem("client"))
    const loanProductsInfo = useQuery(GET_LOAN_PRODUCTS_QUERY, {
        variables: {clientId: parseInt(client.id)},
        fetchPolicy: "network-only"
    })

    const [loanProducts, setLoanProducts] = useState([])
    const [loanProduct, setLoanProduct] = useState(null)
    const [form, setForm] = useState<FormData>({
        loanAmount: null,
        loanDuration: null,
        loanPurpose: null,
        customerId: customerId,
        clientId: parseInt(client.id),
        loanProductId: loanProducts[0]?.id
    })

    const loanProductInfo = useQuery(GET_LOAN_PRODUCT_QUERY, {
        nextFetchPolicy: "network-only",
        variables: {loanProductId: parseInt(form.loanProductId)}
    })

    React.useEffect(() => {
        if (loanProductsInfo.data) {
            setLoanProducts(loanProductsInfo.data.loanProducts)
        }
    }, [loanProductsInfo.data])

    React.useEffect(() => {
        if (loanProductInfo.data) {
            setLoanProduct(loanProductInfo.data.loanProduct)
        }
    }, [loanProductInfo.data])

    function handleChange(event) {
        const {name, value} = event.target;
        form[name] = value
        setForm({...form})
    }

    function durationLabel() {
        if (loanProduct) {
            if (loanProduct.paymentFrequency === "Monthly") return "Months"
            else if (loanProduct.paymentFrequency === "Weekly") return "Weeks"
            else if (loanProduct.paymentFrequency === "Bi Weekly") return "Bi Weeks"
            else if (loanProduct.paymentFrequency === "Daily") return "Days"
        }
    }

    if (data?.applyForLoan) {
        const properties = {
            message: `Loan Application of ${formatCurrency(parseInt(form.loanAmount))} was successful.`,
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
                <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div
                            className="flex items-start justify-between px-6 py-4 border-b border-solid border-gray-300 rounded-t">
                            <h3 className="text-2xl font-semibold">
                                Loan Application
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => close(false)}
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
                                    customerId: customerId,
                                    clientId: parseInt(client.id),
                                    duration: parseInt(form.loanDuration),
                                    amount: parseInt(form.loanAmount),
                                    interestRate: parseFloat(loanProduct.interestRate),
                                    loanProductId: parseInt(form.loanProductId),
                                    loanPurpose: form.loanPurpose,
                                    paymentFrequency: loanProduct.paymentFrequency
                                }
                            })
                        }}>
                            <div className="relative px-6 flex-auto">
                                <div className="my-2 text-gray-600 text-lg leading-relaxed w-full">
                                    <div
                                        className="relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                        <label htmlFor="" className="block">
                                            Loan Product
                                        </label>

                                        {
                                            loanProductsInfo.loading ? <div className="block"> Loading...</div> :
                                                <select
                                                    required
                                                    onChange={handleChange}
                                                    name="loanProductId"
                                                    className="block appearance-none border border-gray-200 text-gray-700 px-3 py-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                                    <option value="">Select</option>
                                                    {loanProducts.map(product => <option value={product.id}
                                                                                         key={product.id}>{product.name}</option>)}

                                                </select>
                                        }
                                        <div
                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                        </div>
                                    </div>
                                    {loanProduct &&
                                    <div className="shadow-lg my-1 p-2">
                                        {loanProductInfo.loading ? <span>loading....</span> :

                                            <div>
                                                <div className="flex justify-start">
                                                    <div className="flex-1">Name: {loanProduct.name}</div>
                                                    <div>Interest rate: {loanProduct.interestRate}</div>

                                                </div>
                                                <div className="flex justify-start">
                                                    <div className="flex-1">Arrears Period: {loanProduct.arrearsPeriod}</div>
                                                    <div>Payment Frequency: {loanProduct.paymentFrequency}</div>
                                                </div>
                                                <div>
                                                    Interest Method: {loanProduct.interestMethod}
                                                </div>

                                            </div>}
                                    </div>}


                                    <div
                                        className="relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                        <label htmlFor="">
                                            Amount
                                        </label>
                                        <input
                                            name="loanAmount"
                                            type="number"
                                            required
                                            onChange={handleChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                        />
                                    </div>

                                    <div
                                        className="relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                        <label htmlFor="">
                                            Loan Duration { loanProduct && `in ${durationLabel()}`}
                                        </label>
                                        <input
                                            name="loanDuration"
                                            type="number"
                                            required
                                            onChange={handleChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                    <div
                                        className="relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                        <label htmlFor="">
                                            Loan Purpose
                                        </label>

                                        <select
                                            required
                                            onChange={handleChange}
                                            name="loanPurpose"
                                            className="block appearance-none border border-gray-200 text-gray-700 px-3 py-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                            <option value="">Select</option>
                                            <option value="Asset Finance">Asset Finance</option>
                                            <option value="Education">Education</option>
                                            <option value="Agriculture">Agriculture</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="flex items-center justify-end p-3 rounded-b">
                                <button
                                    className="bg-green-500 text-white active:bg-green-600 text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="submit"
                                    disabled={false}
                                >
                                    Apply
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