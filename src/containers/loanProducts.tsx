import {Nav} from "../components/Nav";
import React, {useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {LoanProductsPage} from "./loanProductsPage";
import {NewLoanProduct} from "./newLoanProduct";

const GET_LOAN_PRODUCTS_QUERY = gql`
    query loanProducts($clientId: Int!) {
        loanProducts(clientId: $clientId) {
            arrearsPeriod
            earlyPaymentPenalty
            interestMethod
            interestRate
            name
            paymentFrequency
            id
        }
    }
`

const CREATE_NEW_LOAN_PRODUCT_MUTATION = gql`
    mutation createLoanProduct($clientId: Int!, $name: String!, $interestRate: Float!, $penaltyRate: Float!, $arrearsPeriod: Int!, $paymentFrequency: String!, $interestMethod: String, $type: String) {
        createLoanProduct(clientId: $clientId, name: $name, interestRate: $interestRate, penaltyRate: $penaltyRate, arrearsPeriod: $arrearsPeriod, paymentFrequency: $paymentFrequency, interestMethod: $interestMethod, type: $type) {
            clientId
            id
        }
    }
`
export function LoanProducts() {
    const clientId = JSON.parse(localStorage.getItem("client")).id
    const loanProductsInfo = useQuery(GET_LOAN_PRODUCTS_QUERY, {variables: {clientId: parseInt(clientId)}})
    const [createLoanProduct, createLoanProductResult] = useMutation(CREATE_NEW_LOAN_PRODUCT_MUTATION, {errorPolicy: "all"})
    const [showNewLoanProductModal, setShowNewLoanProductModal] = useState(false)

    return (
        <Nav>
            {showNewLoanProductModal && <NewLoanProduct data={createLoanProductResult.data} close={setShowNewLoanProductModal} submit={createLoanProduct} loading={createLoanProductResult.loading} error={createLoanProductResult.error}/>}
            <LoanProductsPage loanProductsInfo={loanProductsInfo} setShowLoanProductModal={setShowNewLoanProductModal}/>
        </Nav>
    )
}