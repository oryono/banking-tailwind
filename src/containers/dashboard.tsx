import React from 'react';
import {Nav} from '../components/Nav';
import {Monthly} from "./totals/monthly";
import {gql, useQuery} from "@apollo/client";
import {Transaction} from "../components/totals/transaction";
import {CustomerSummary} from "./customerSummary";

const GET_WITHDRAWALS_TOTAL_QUERY = gql`
    query getWithdrawalsTotal{
        getWithdrawalsTotal {
            total
        }

    }
`;

const GET_TRANSFERS_TOTAL_QUERY = gql`
    query getTransfersTotal{
        getTransfersTotal {
            total
        }

    }
`;

const GET_DEPOSITS_TOTAL_QUERY = gql`
    query getDepositsTotal{
        getDepositsTotal {
            total
        }

    }
`;

const GET_OUTSTANDING_BALANCE_QUERY = gql`
    query getOutstandingBalanceQuery{
        getTotalOutstandingPrincipal {
            total
        }
    }
`;

const GET_TOTAL_AMOUNT_DISBURSED = gql`
    query getTotalAmountDisbursed{
        getTotalAmountDisbursed {
            total
        }
    }
`;

const GET_DISBURSEMENT_COUNT_QUERY = gql`
    query getDisbursementCount{
        getTotalDisbursements {
            total
        }
    }
`;

export function Dashboard() {
    const deposits = useQuery(GET_DEPOSITS_TOTAL_QUERY, {fetchPolicy: "network-only"})
    const withdraws = useQuery(GET_WITHDRAWALS_TOTAL_QUERY, {fetchPolicy: "network-only"})
    const transfers = useQuery(GET_TRANSFERS_TOTAL_QUERY, {fetchPolicy: "network-only"})
    const outstanding = useQuery(GET_OUTSTANDING_BALANCE_QUERY, {fetchPolicy: "network-only"})
    const disbursementTotal = useQuery(GET_TOTAL_AMOUNT_DISBURSED, {fetchPolicy: "network-only"})
    const disbursementCount = useQuery(GET_DISBURSEMENT_COUNT_QUERY, {fetchPolicy: "network-only"})
    return (
        <Nav>
            <div>
                <div className="mb-4">
                    <p className="font-bold text-2xl text-gray-700">
                        Dashboard
                    </p>
                </div>
                <div>
                    <Monthly/>
                </div>

                <div>
                    <CustomerSummary/>
                </div>

                <div className="my-4">
                    <p className="font-bold text-2xl text-gray-700">
                        Banking
                    </p>

                    <div className="flex justify-between pt-4">
                        <div className="flex flex-col w-full flex-grow-1 h-48 shadow-md m-1 rounded">
                            <Transaction type="Deposits" transactionInfo={deposits}/>
                        </div>
                        <div className="flex flex-col w-full shadow-md flex-grow-1 m-1 rounded">
                            <Transaction type="Withdraws" transactionInfo={withdraws}/>
                        </div>
                        <div className="flex flex-col w-full shadow-md flex-grow-1 m-1 rounded">
                            <Transaction type="Transfers" transactionInfo={transfers}/>
                        </div>
                    </div>
                </div>

                <div className="my-4">
                    <p className="font-bold text-2xl text-gray-700">
                        Loans
                    </p>

                    <div className="flex justify-between pt-4">
                        <div className="flex flex-col w-full flex-grow-1 h-48 shadow-md m-1 rounded">
                            <Transaction type="Loans Disbursed" transactionInfo={disbursementCount}/>
                        </div>
                        <div className="flex flex-col w-full shadow-md flex-grow-1 m-1 rounded">
                            <Transaction type="Outstanding" transactionInfo={outstanding}/>
                        </div>
                        <div className="flex flex-col w-full shadow-md flex-grow-1 m-1 rounded">
                            <Transaction type="Amount Disbursed" transactionInfo={disbursementTotal}/>
                        </div>
                    </div>
                </div>
            </div>
        </Nav>
    );
}
