import React, {useState} from "react";
import {Nav} from "../components/Nav";
import {gql, useQuery} from "@apollo/client";
import {withRouter} from "react-router-dom";
import {Installments} from "./installments";
import {Loading} from "../components/Loading";
import {formatCurrency} from "../utils/currency";

const GET_ACCOUNT_DETAILS = gql`
    query getAccountDetails ($accountId: Int!){
        accountDetails(accountId: $accountId){
            account{
                id
                description
                teller {
                    id
                    name
                    email
                    id
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
                    currentMonthlyPayment
                    interestRate
                    status
                    totalPrincipal
                    purpose
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
    const [loanDetails, seLoanDetails] = useState()
    const loanAccountDetails = useQuery(GET_ACCOUNT_DETAILS, {variables: {accountId: parseInt(loanAccountId)}})

    React.useEffect(() => {
        if (!loanAccountDetails.loading && loanAccountDetails.data) {
            seLoanDetails(loanAccountDetails.data.accountDetails)
        }
    }, [loanAccountDetails.loading, loanAccountDetails.data])

    if (loanAccountDetails.loading) return <Loading/>
    return (
        <Nav>
            <div>
                <p className="font-bold text-2xl text-gray-700 inline">{loanDetails?.account.name}</p>
                <div className="my-2 p-4 rounded overflow-hidden shadow-lg h-auto text-gray-600 text-lg">
                    <div className="flex">
                        <div className="flex-1">
                            <div className="py-1">Requested Amount: <span className="text-green-600">{formatCurrency(loanDetails?.account.loanDetail.totalPrincipal)}</span></div>
                            <div className="py-1">Disbursed Amount: {loanDetails?.account.loanDetail.status !== "Disbursed" ? <span>Not disbursed</span> : <span>{formatCurrency(100000)}</span>}</div>
                            <div className="py-1">Outstanding Balance: {loanDetails?.account.loanDetail.status !== "Disbursed" ? <span>Not disbursed</span> : <span>{formatCurrency(loanDetails?.balance)}</span>}</div>
                        </div>
                        <div className="border-l-2 px-2 flex-1">
                            <div className="py-1">Status: <span className="text-green-600">{loanDetails?.account.loanDetail.status}</span></div>
                            <div className="py-1">Purpose: <span className="text-green-600">{loanDetails?.account.loanDetail.purpose}</span></div>
                            <div className="py-1">Interest Rate: <span className="text-green-600">{loanDetails?.account.loanDetail.interestRate} %</span></div>
                        </div>
                    </div>

                </div>
                <Installments installments={loanDetails?.account.loanInstallments}/>
            </div>
        </Nav>
    )
}

export default withRouter(Loan)