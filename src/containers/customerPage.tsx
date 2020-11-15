import React, {useState} from "react";
import {gql, QueryResult, useMutation} from "@apollo/client";
import Error from "../components/Error";
import {CustomerCard} from "../components/customerCard";
import Shares from "./shares";
import {Wallets} from "./wallets";
import {Loans} from "./loans";
import {PuffLoader} from "react-spinners";
import { Deposit } from "./deposit";
import {Withdraw} from "./withdraw";

const CREATE_DEPOSIT_MUTATION = gql`
    mutation createDeposit($amount: Int!, $walletId: Int!) {
        createDeposit(amount: $amount, walletId: $walletId) {
            account{
                name
            }
            amount
            description
            runningBalance
        }
    }
`

const CREATE_WITHDRAWAL_MUTATION = gql`
    mutation createWithdrawal($amount: Int!, $walletId: Int!){
        createWithdrawal(amount: $amount, walletId: $walletId) {
            account{
                name
            }
            amount
            description
            runningBalance
        }
    }
`

export function CustomerPage({customerInfo}: {customerInfo: QueryResult}) {
    const [showDepositModal, setShowDepositModal] = useState({show: false, account: null})
    const [showWithdrawalModal, setShowWithdrawalModal] = useState({show: false, account: null})
    const [ deposit, depositResult] = useMutation(CREATE_DEPOSIT_MUTATION)
    const [ withdraw, withdrawalResult] = useMutation(CREATE_WITHDRAWAL_MUTATION, { errorPolicy: "all"})
    const [refetchWallets, setRefetchWallets] = useState(false)

    React.useEffect(() => {
        if (depositResult.data?.createDeposit != null || depositResult.data?.createWithdrawal != null) {
            setRefetchWallets(true)
        }
    }, [depositResult.data, withdrawalResult.data])

    if (customerInfo.loading) return (
        <div className="flex">
            <div className="m-auto flex flex-col justify-evenly items-center"><PuffLoader/><p
                className="text-gray-500">Loading customer info...</p></div>
        </div>
    )
    if (customerInfo.error) return <Error error={customerInfo.error}/>
    return (
        <div>
            { showDepositModal.show ? <Deposit close={setShowDepositModal} account={showDepositModal.account} submit={deposit} loading={depositResult.loading} error={depositResult.error} data={depositResult.data}/> : null }
            { showWithdrawalModal.show ? <Withdraw close={setShowWithdrawalModal} account={showWithdrawalModal.account} submit={withdraw} loading={withdrawalResult.loading} error={withdrawalResult.error} data={withdrawalResult.data}/> : null }
            <div className="mb-4">
                <p className="font-bold text-2xl text-gray-700">
                    {customerInfo.data.customer.name}
                </p>

                <div className="flex pt-4">
                    <div className="w-1/4">
                        <CustomerCard customer={customerInfo.data.customer}/>
                    </div>
                    <div className="w-3/4 px-4">
                        <Shares customerId={customerInfo.data.customer.id}/>
                        <Wallets customerId={customerInfo.data.customer.id} showDepositModal={setShowDepositModal} showWithdrawalModal={setShowWithdrawalModal} refetchWallets={refetchWallets}/>
                        <Loans customerId={customerInfo.data.customer.id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}