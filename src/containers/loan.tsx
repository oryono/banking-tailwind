import React, {useState} from "react";
import {Nav} from "../components/Nav";
import {gql, useMutation, useQuery} from "@apollo/client";
import {withRouter} from "react-router-dom";
import {Installments} from "./installments";
import {Loading} from "../components/Loading";
import {formatCurrency} from "../utils/currency";
import {Entries} from "./entries";
import {amortizationSchedule} from "../utils/amortization";
import {Approve} from "./approve";
import {Disburse} from "./disburse";

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

const DISBURSE_LOAN_MUTATION = gql`
    mutation disburseLoan($disbursementAmount: Int!, $loanAccountId: Int!, $loanStandingOrderAccountId: Int!, $disbursementAccountId: Int!, $installments: String!) {
        disburseLoan(disbursementAmount: $disbursementAmount, disbursementAccountId: $disbursementAccountId, installments: $installments, loanStandingOrderAccountId: $loanStandingOrderAccountId, loanAccountId: $loanAccountId) {
            message
        }
    }
`

const APPROVE_LOAN_MUTATION = gql`
    mutation approveLoan($approvalJustification: String!, $approvedAmount: Int!, $loanAccountId: Int!) {
        approveLoan(approvalJustification: $approvalJustification, approvedAmount: $approvedAmount, loanAccountId: $loanAccountId) {
            message
        }
    }
`

function Loan(props) {
    const loanAccountId = props.match.params.id
    const [loanDetails, seLoanDetails] = useState()

    const loanAccountDetails = useQuery(GET_ACCOUNT_DETAILS, {variables: {accountId: parseInt(loanAccountId)}})
    const [disburse, result] = useMutation(DISBURSE_LOAN_MUTATION)
    const [approve, approvalResult] = useMutation(APPROVE_LOAN_MUTATION)

    const [temporalySchedule, setTemporalySchedule] = useState([])
    const [showApprovalModal, setShowApprovalModal] = useState(false)
    const [showDisburseModal, setShowDisburseModal] = useState(false)

    function generateSchedule(principal, period, interest) {
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
                <div>
                    <p className="font-bold text-2xl text-gray-700 inline">{loanDetails?.account.name}</p>
                    <span className="float-right">
                        <button disabled={loanDetails?.account.loanDetail.status === "Approved" || loanDetails?.account.loanDetail.status === "Disbursed"} onClick={() => setShowApprovalModal(true)} className="p-1 mx-1 rounded border border-blue-400 text-blue-400">Approve</button>
                        <button disabled={loanDetails?.account.loanDetail.status !== "Approved" || loanDetails?.account.loanDetail.status === "Disbursed"} onClick={() => setShowDisburseModal(true)} className="p-1 mx-1 rounded border border-blue-400 text-blue-400">Disburse</button>
                        <button className="p-1 mx-1 rounded border border-blue-400 text-blue-400">Write off</button>
                        <button className="p-1 mx-1 rounded border border-blue-400 text-blue-400">Clear</button>
                    </span>

                </div>
                {showApprovalModal && <Approve loanDetails={loanDetails} close={setShowApprovalModal} submit={approve} loading={approvalResult.loading} error={approvalResult.error}/>}
                {showDisburseModal && <Disburse loanDetails={loanDetails} close={setShowDisburseModal} installments={JSON.stringify(temporalySchedule)} loading={result.loading} error={result.error} submit={disburse}/>}

                <div className="my-2 p-4 rounded overflow-hidden shadow-lg h-auto text-gray-600 text-lg">
                    <div className="flex">
                        <div className="flex-1">
                            <div className="py-1">Requested Amount: <span
                                className="text-green-600">{formatCurrency(loanDetails?.account.loanDetail.totalPrincipal)}</span>
                            </div>
                            <div className="py-1">Disbursed
                                Amount: {loanDetails?.account.loanDetail.status !== "Disbursed" ?
                                    <span>Not disbursed</span> : <span>{formatCurrency(loanDetails?.account.loanDetail.approvedAmount)}</span>}</div>
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

                {loanDetails?.account.loanDetail.status === "Disbursed" ?
                    <Installments installments={loanDetails?.account.loanInstallments} scheduleTitle="Installments"/> :
                    <Installments installments={temporalySchedule} scheduleTitle="Temporal Schedule"/>}

            </div>
        </Nav>
    )
}

export default withRouter(Loan)