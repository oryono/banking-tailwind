import React, {useState} from "react";
import {ApolloError, gql, MutationFunctionOptions, useQuery} from "@apollo/client";
import {Loading} from "../components/Loading";

const GET_WALLET_PRODUCTS_QUERY = gql`
    query getWalletProducts($clientId: Int!) {
        walletProducts(clientId: $clientId) {
            id
            clientId
            name
            depositFee
            minBalance
            openingBalance
            monthlyCharge
            interestRate
            withdrawalFee
        }
    }
`

interface FormData {
    clientId: number;
    customerId: number;
    description: string;
    walletProductId: string;
}

interface Props {
    submit(data: MutationFunctionOptions): void;
    close: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean;
    error: ApolloError;
    customerId: number;

}

export function NewWallet({loading, error, submit, close, customerId }: Props) {
    const client = JSON.parse(localStorage.getItem("client"))
    const [walletProducts, setWalletProducts] = useState([])
    const [form, setForm] = useState<FormData>({clientId: parseInt(client.id), customerId: customerId, description: "", walletProductId: null})
    const walletProductsInfo = useQuery(GET_WALLET_PRODUCTS_QUERY, { variables: {clientId: parseInt(client.id)}, fetchPolicy: "network-only"})

    React.useEffect(() => {
        if (walletProductsInfo.data) {
            setWalletProducts(walletProductsInfo.data.walletProducts)
        }
    }, [walletProductsInfo.data])

    function handleChange(event) {
        const { name, value } = event.target;
        form[name] = value
        setForm({...form})
    }

    if (walletProductsInfo.loading) {
        return <Loading/>
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
                                New Wallet
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
                        <form action="" onSubmit={(e) => {
                            e.preventDefault();
                            submit({variables: {clientId: form.clientId, customerId: customerId, description: form.description, walletProductId: parseInt(form.walletProductId)}})
                        }}>
                            <div className="relative px-6 flex-auto">
                                <div className="my-2 text-gray-600 text-lg leading-relaxed w-full">
                                    <div className="relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                        <label htmlFor="">
                                            Wallet Product
                                        </label>

                                        <select
                                            required
                                            onChange={handleChange}
                                            name="walletProductId"
                                            className="block appearance-none border border-gray-200 text-gray-700 px-3 py-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                            <option value="">Select</option>
                                            { walletProducts.map(product => <option value={product.id} key={product.id}>{product.name}</option>)}

                                        </select>
                                        <div
                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                            {/*<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"*/}
                                            {/*     xmlns="http://www.w3.org/2000/svg">*/}
                                            {/*    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}*/}
                                            {/*          d="M19 9l-7 7-7-7"/>*/}
                                            {/*</svg>*/}
                                        </div>
                                    </div>

                                    <div className="relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                        <label htmlFor="">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            required
                                            onChange={handleChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="flex items-center justify-end p-3 rounded-b">
                                <button
                                    className="bg-green-500 text-white active:bg-green-600 text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Create Wallet
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