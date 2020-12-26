import React, {useState} from "react";
import {Nav} from "../components/Nav";
import {gql, useQuery} from "@apollo/client";
import {withRouter} from "react-router-dom";
import {Installments} from "./installments";
import {Loading} from "../components/Loading";
import {formatCurrency} from "../utils/currency";
import {Entries} from "./entries";
import {amortizationSchedule} from "../utils/amortization";

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
                    currentMonthlyPayment
                    interestRate
                    status
                    totalPrincipal
                    purpose
                    loanPeriod
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

    const [temporalySchedule, setTemporalySchedule] = useState([])

    function generateSchedule(principal, period, interest) {
        console.log("Principal", principal)
        console.log("Period", period)
        console.log("Interest", interest)
        return amortizationSchedule(principal, period, interest)
    }

    React.useEffect(() => {
        if (!loanAccountDetails.loading && loanAccountDetails.data) {
            seLoanDetails(loanAccountDetails.data.accountDetails)
            setTemporalySchedule(generateSchedule(loanDetails?.account.loanDetail?.totalPrincipal, loanDetails?.account.loanDetail?.loanPeriod, loanDetails?.account.loanDetail?.interestRate))
        }
    }, [loanAccountDetails.loading, loanAccountDetails.data, loanDetails])

    if (loanAccountDetails.loading) return <Loading/>
    return (
        <Nav>
            <div>
                <p className="font-bold text-2xl text-gray-700 inline">{loanDetails?.account.name}</p>
                <div className="my-2 p-4 rounded overflow-hidden shadow-lg h-auto text-gray-600 text-lg">
                    <div className="flex">
                        <div className="flex-1">
                            <div className="py-1">Requested Amount: <span
                                className="text-green-600">{formatCurrency(loanDetails?.account.loanDetail.totalPrincipal)}</span>
                            </div>
                            <div className="py-1">Disbursed
                                Amount: {loanDetails?.account.loanDetail.status !== "Disbursed" ?
                                    <span>Not disbursed</span> : <span>{formatCurrency(100000)}</span>}</div>
                            <div className="py-1">Outstanding
                                Balance: {loanDetails?.account.loanDetail.status !== "Disbursed" ?
                                    <span>Not disbursed</span> :
                                    <span>{formatCurrency(loanDetails?.balance)}</span>}</div>
                        </div>
                        <div className="border-l-2 px-2 flex-1">
                            <div className="py-1">Status: <span
                                className="text-green-600">{loanDetails?.account.loanDetail.status}</span></div>
                            <div className="py-1">Purpose: <span
                                className="text-green-600">{loanDetails?.account.loanDetail.purpose}</span></div>
                            <div className="py-1">Interest Rate: <span
                                className="text-green-600">{loanDetails?.account.loanDetail.interestRate} %</span></div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-lg text-gray-700 inline">Entries</p>
                    <Entries entries={loanDetails?.account.entries}/>
                </div>

                {loanDetails?.account.loanDetail.status === "Disbursed" ? <Installments installments={loanDetails?.account.loanInstallments} scheduleTitle="Installments"/> : <Installments installments={temporalySchedule} scheduleTitle="Temporal Schedule"/>}

            </div>
        </Nav>
    )
}

export default withRouter(Loan)