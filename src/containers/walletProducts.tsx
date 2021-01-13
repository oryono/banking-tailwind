import {Nav} from "../components/Nav";
import React, {useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {WalletProductsPage} from "./walletProductsPage";
import {NewWalletProduct} from "./NewWalletProduct";

const GET_WALLET_PRODUCTS_QUERY = gql`
    query getWalletProducts($clientId: Int!) {
        walletProducts(clientId: $clientId) {
            clientId
            depositFee
            withdrawalFee
            id
            interestRate
            minBalance
            monthlyCharge
            name
            openingBalance
        }
    }
`

const CREATE_WALLET_PRODUCTS_MUTATION = gql`
    mutation createWalletProduct($clientId: String!, $depositFee: Int!, $withdrawalFee: Int!, $interestRate: Int!, $type: String!, $minBalance: String!, $monthlyCharge: Int!, $name: String, $openingBalance: Int!){
        createWalletProduct(clientId: $clientId, depositFee: $depositFee, withdrawalFee: $withdrawalFee, interestRate: $interestRate, type: $type, minBalance: $minBalance, monthlyCharge: $monthlyCharge, name: $name, openingBalance: $openingBalance) {
            depositFee
            clientId
            id
        }
    }
`
export function WalletProducts() {
    const clientId = JSON.parse(localStorage.getItem("client")).id
    const walletProductsInfo = useQuery(GET_WALLET_PRODUCTS_QUERY, {variables: {clientId: parseInt(clientId)}})
    const [createWalletProduct, createWalletProductResult] = useMutation(CREATE_WALLET_PRODUCTS_MUTATION, {errorPolicy: "all"})
    const [showNewWalletProductModal, setShowNewWalletProductModal] = useState(false)

    return (
        <Nav>
            {showNewWalletProductModal && <NewWalletProduct data={createWalletProductResult.data} error={createWalletProductResult.error} loading={createWalletProductResult.loading} submit={createWalletProduct} close={setShowNewWalletProductModal}/>}
            <WalletProductsPage walletProductsInfo={walletProductsInfo} setShowNewWalletProductModal={setShowNewWalletProductModal}/>
        </Nav>
    )
}