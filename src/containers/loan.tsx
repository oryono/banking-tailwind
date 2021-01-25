import React from "react";
import {Nav} from "../components/Nav";
import {gql, useQuery} from "@apollo/client";
import {withRouter} from "react-router-dom";
import {LoanPage} from "./loanPage";

const GET_ACCOUNT_DETAILS = gql`
    query getAccountDetails ($accountId: Int!){
        accountDetails(accountId: $accountId){
            account{
                id
                description
                teller {
                    id
                    name
                    id
                }
                entries{
                    account {
                        name
                        type
                    }
                    amount
                    id
                    transactionReference
                    type
                    insertedAt
                    runningBalance
                    description
                }
                loanInstallments {
                    id
                    paymentNumber
                    monthlyPayment
                    principal
                    interest
                    balance
                    paymentDate
                }
                loanDetail{
                    paymentFrequency
                    interestRate
                    status
                    totalPrincipal
                    purpose
                    loanPeriod
                    approvedAmount
                    approvedBy
                    approvedOn
                    disbursedBy
                    disbursedOn
                }
                customer {
                    id
                    name
                    accounts{
                        id
                        name
                    }
                }
                name
                clientId
                type
            }
            balance
        }
    }
`;


function Loan(props) {
    const loanAccountId = props.match.params.id
    const loanAccountDetailsInfo = useQuery(GET_ACCOUNT_DETAILS, {variables: {accountId: parseInt(loanAccountId)}})

    return (
        <Nav><LoanPage loanAccountDetailsInfo={loanAccountDetailsInfo}/></Nav>
    )
}

export default withRouter(Loan)