import React from 'react';
import {Nav} from '../components/Nav';
import {CustomerList} from "../components/customerList";
import {gql, useQuery} from "@apollo/client";

const GET_CUSTOMERS_QUERY = gql`
    query getCustomers {
        customers {
            name
            phone
            email
            gender
            id
            identification
            profilePicture
        }
    }
`;

export function Customers() {
    const customersInfo = useQuery(GET_CUSTOMERS_QUERY, {fetchPolicy: "network-only"})

    return (
        <Nav>
            <div>
                <div className="mb-4">
                    <p className="font-bold text-2xl text-gray-700">Customers</p>
                </div>
                <div>
                    <CustomerList customersInfo={customersInfo}/>
                </div>
            </div>
        </Nav>
    );
}
