import {Nav} from "../components/Nav";
import React from "react";
import {gql, useQuery} from "@apollo/client";
import {WalletProductsPage} from "./walletProductsPage";

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
export function WalletProducts() {
    const clientId = JSON.parse(localStorage.getItem("client")).id
    const walletProductsInfo = useQuery(GET_WALLET_PRODUCTS_QUERY, {variables: {clientId: parseInt(clientId)}})

    return (
        <Nav>
            <WalletProductsPage walletProductsInfo={walletProductsInfo}/>
        </Nav>
    )
}