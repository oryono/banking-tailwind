import React, {useState} from 'react';
import {Nav} from '../components/Nav';
import {CustomerList} from "../components/customerList";
import {gql, useMutation, useQuery} from "@apollo/client";
import {NewCustomer} from "./newCustomer";

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

const CREATE_CUSTOMER_MUTATION = gql`
    mutation createCustomer(
        $city: String
        $clientId: Int!
        $country: String!
        $county: String
        $district: String!
        $dob: Date!
        $email: String
        $gender: String!
        $name: String!
        $nextOfKin: String
        $nextOfKinPhone: String
        $parish: String
        $phone: String!
        $subCounty: String
        $village: String!){
        createCustomer(city: $city, clientId: $clientId, country: $country, county: $county, subCounty: $subCounty, gender: $gender, district: $district, dob: $dob, name: $name, email: $email, phone: $phone, nextOfKin: $nextOfKin, nextOfKinPhone: $nextOfKinPhone, parish: $parish, village: $village) {
            id
            name
            email
            phone
        }
    }
`

export function Customers() {
    const customersInfo = useQuery(GET_CUSTOMERS_QUERY, {fetchPolicy: "network-only"})
    const [showNewCustomerModal, setShowNewCustomerModal] = useState(false)
    const [ createCustomer, createCustomerResult] = useMutation(CREATE_CUSTOMER_MUTATION, {errorPolicy: "all"})

    return (
        <Nav>
            <div>
                {showNewCustomerModal ? <NewCustomer close={setShowNewCustomerModal} submit={createCustomer} loading={createCustomerResult.loading} error={createCustomerResult.error}/> : null}
                <div className="mb-4">
                    <p className="font-bold text-2xl text-gray-700 inline">Customers</p>
                    <span className="float-right">
                        <button onClick={() => setShowNewCustomerModal(true)} type="button">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                        </button>
                    </span>
                </div>
                <div>
                    <CustomerList customersInfo={customersInfo}/>
                </div>
            </div>
        </Nav>
    );
}
