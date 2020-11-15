import {Nav} from "../components/Nav";
import React from "react";
import {gql, useQuery} from "@apollo/client";
import {LoanProductsPage} from "./loanProductsPage";

const GET_LOAN_PRODUCTS_QUERY = gql`
    query loanProducts($clientId: Int!) {
        loanProducts(clientId: $clientId) {
            arearsPeriod
            earlyPaymentPenalty
            interestMethod
            interestRate
            name
            paymentFrequency
            id
        }
    }
`
export function LoanProducts() {
    const clientId = JSON.parse(localStorage.getItem("client")).id
    const loanProductsInfo = useQuery(GET_LOAN_PRODUCTS_QUERY, {variables: {clientId: parseInt(clientId)}})
    return (
        <Nav>
            <LoanProductsPage loanProductsInfo={loanProductsInfo}/>
        </Nav>
    )
}