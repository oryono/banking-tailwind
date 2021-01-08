import React, {useState} from "react";
import {gql, QueryResult, useMutation} from "@apollo/client";
import Error from "../components/Error";
import {CustomerCard} from "../components/customerCard";
import {Wallets} from "./wallets";
import {Loans} from "./loans";
import {PuffLoader} from "react-spinners";
import { Deposit } from "./deposit";
import {Withdraw} from "./withdraw";
import {NewWallet} from "./newWallet";
import {NewLoanApplication} from "./newLoanApplication";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

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

const CREATE_WALLET_MUTATION = gql`
    mutation createWallet($clientId: Int!, $walletProductId: Int!, $customerId: Int!, $description: String){
        createWalletAccount(clientId: $clientId, customerId: $customerId, description: $description, walletProductId: $walletProductId) {
            accountNumber
        }
    }
`

const CREATE_LOAN_APPLICATION_MUTATION = gql`
    mutation applyForLoan($clientId: Int!, $amount: Int!, $customerId: Int!, $loanPurpose: String!, $duration: Int!, $interestRate: Int!, $installments: String!, $loanProductId: Int!) {
        applyForLoan(clientId: $clientId, amount: $amount, customerId: $customerId, purpose: $loanPurpose, duration: $duration, interestRate: $interestRate, loanProductId: $loanProductId, installments: $installments) {
            id
            accountNumber
            client{
                name
            }
            customer{
                name
            }
        }
    }
`

export function CustomerPage({customerInfo, customerId}: {customerInfo: QueryResult, customerId: number}) {
    const [showDepositModal, setShowDepositModal] = useState({show: false, account: null})
    const [showWithdrawalModal, setShowWithdrawalModal] = useState({show: false, account: null})
    const [showNewWalletModal, setShowNewWalletModal] = useState(false)
    const [showLoanApplicationModal, setShowLoanApplicationModal] = useState(false)

    const [ deposit, depositResult] = useMutation(CREATE_DEPOSIT_MUTATION, {errorPolicy: "all"})
    const [ withdraw, withdrawalResult] = useMutation(CREATE_WITHDRAWAL_MUTATION, { errorPolicy: "all"})
    const [ createWallet, createWalletResult] = useMutation(CREATE_WALLET_MUTATION)
    const [ createLoanApplication, createLoanApplicationResult] = useMutation(CREATE_LOAN_APPLICATION_MUTATION, {errorPolicy: "all"})

    if (customerInfo.loading) return (
        <div className="flex">
            <div className="m-auto flex flex-col justify-evenly items-center"><PuffLoader/><p
                className="text-gray-500">Loading customer info...</p></div>
        </div>
    )
    if (customerInfo.error) return <Error error={customerInfo.error}/>
    return (
        <div>
            { showNewWalletModal ? <NewWallet close={setShowNewWalletModal} submit={createWallet} loading={createWalletResult.loading} error={createWalletResult.error} customerId={customerId}/> : null}
            { showDepositModal.show ? <Deposit close={setShowDepositModal} account={showDepositModal.account} submit={deposit} loading={depositResult.loading} error={depositResult.error} data={depositResult.data}/> : null }
            { showWithdrawalModal.show ? <Withdraw close={setShowWithdrawalModal} account={showWithdrawalModal.account} submit={withdraw} loading={withdrawalResult.loading} error={withdrawalResult.error} data={withdrawalResult.data}/> : null }
            { showLoanApplicationModal ? <NewLoanApplication customerId={customerId} close={() => setShowLoanApplicationModal(false)} error={createLoanApplicationResult.error} loading={createLoanApplicationResult.loading} submit={createLoanApplication} data={createLoanApplicationResult.data}/> : null}
            <div className="mb-4">
                <p className="font-bold text-2xl text-gray-700">
                    {customerInfo.data.customer.name}
                </p>

                <div className="flex pt-4">
                    <div className="w-1/4">
                        <CustomerCard customer={customerInfo.data.customer}/>
                    </div>
                    <div className="w-3/4 px-4">
                        <Wallets customerId={customerInfo.data.customer.id} showDepositModal={setShowDepositModal} showWithdrawalModal={setShowWithdrawalModal} showNewWalletModal={setShowNewWalletModal}/>
                        <Loans customerId={customerInfo.data.customer.id} setShowLoanApplicationModal={setShowLoanApplicationModal}/>
                    </div>
                </div>
            </div>
        </div>
    )
}