import React, {useState} from "react";
import {Nav} from "../components/Nav";
import {gql, useQuery} from "@apollo/client";
import {LoansPage} from "./loansPage";

const GET_LOANS_QUERY = gql`
    query getLoans($clientId: Int!, $matching: String, $filter: String, $loanStatus: String) {
        accounts(clientId: $clientId, matching: $matching, filter: $filter, loanStatus: $loanStatus) {
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

interface Filter {
    filter: string;
    loanStatus: string;
}

export function AllLoans() {
    const [filters, setFilters] = useState<Filter>({filter: "", loanStatus: "Disbursed"})
    const client = JSON.parse(localStorage.getItem("client"));
    const loansInfo = useQuery(GET_LOANS_QUERY, {variables: {clientId: parseInt(client.id), matching: "Loan", filter: filters.filter, loanStatus: filters.loanStatus}})

    function handleChange(event) {
        const { name, value } = event.target;
        filters[name] = value
        setFilters({...filters})
    }

    return (
        <Nav>
            <div>
                <div>
                    <p className="font-bold text-2xl text-gray-700">Loans</p>
                </div>
                <div>
                    <div className="py-2">
                        <form action="">
                            <div className="flex">
                                <div className="relative flex w-full flex-wrap items-stretch flex-2">
                                    <input
                                        onChange={handleChange}
                                        name="filter"
                                        type="text"
                                        value={filters.filter}
                                        autoFocus
                                        placeholder="Search by account name or number"
                                        className="appearance-none border p-3 relative focus:outline-none focus:shadow-outline-blue focus:border-blue-300 w-full"
                                    />
                                </div>

                                <div className="relative flex w-full flex-wrap items-stretch">
                                    <select
                                        name="loanStatus"
                                        onChange={handleChange}
                                        value={filters.loanStatus}
                                        className="block appearance-none border text-gray-700 p-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                        <option value="Disbursed">Disbursed</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Written Off">Written Off</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Cleared">Cleared</option>
                                    </select>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
            <LoansPage loansInfo={loansInfo}/>
        </Nav>
    )
}