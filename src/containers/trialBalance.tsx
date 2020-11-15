import React from "react";
import {Nav} from "../components/Nav";
import {gql, useQuery} from "@apollo/client";

const GET_ACCOUNT_TOTALS_QUERY = gql`
    query getAccountTotals($accountType: String!, $startingDate: Date!, $closingDate: Date!) {
        accountTotals(accountType: $accountType, startingDate: $startingDate, closingDate: $closingDate) {
            total
        }
    }

`
export function TrialBalance() {
    return (
        <Nav>
            <div>Trial Balance</div>
        </Nav>
    )

}