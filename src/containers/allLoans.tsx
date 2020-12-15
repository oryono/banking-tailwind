import React from "react";
import {Nav} from "../components/Nav";
import {gql, useQuery} from "@apollo/client";
import {LoansPage} from "./loansPage";

const GET_LOANS_QUERY = gql`
    query getLoans($clientId: Int!) {
        accounts(type: "asset", clientId: $clientId, matching: "Loan") {
            id
            name
            accountNumber
            description
            customer{
                id
                name
            }
            loanDetail{
                status
                totalPrincipal
            }
            loanInstallments {
                id
                principal
            }
        }
    }
`;

export function AllLoans() {
    const client = JSON.parse(localStorage.getItem("client"));
    const loansInfo = useQuery(GET_LOANS_QUERY, {variables: {clientId: parseInt(client.id)}})
    return (
        <Nav>
            <LoansPage loansInfo={loansInfo}/>
        </Nav>
    )
}