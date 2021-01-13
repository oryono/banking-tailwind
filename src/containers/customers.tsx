import React, {useState} from 'react';
import {Nav} from '../components/Nav';
import {CustomerList} from "../components/customerList";
import {gql, useMutation, useQuery} from "@apollo/client";
import {NewCustomer} from "./newCustomer";

const GET_CUSTOMERS_QUERY = gql`
    query getCustomers($filter: String) {
        customers(filter: $filter) {
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
    const [filter, setFilter] = useState("")
    const customersInfo = useQuery(GET_CUSTOMERS_QUERY, {variables: {filter: filter}, fetchPolicy: "network-only"})
    const [showNewCustomerModal, setShowNewCustomerModal] = useState(false)
    const [createCustomer, createCustomerResult] = useMutation(CREATE_CUSTOMER_MUTATION, {errorPolicy: "all"})

    function handleChange(event) {
        setFilter(event.target.value)
    }
    return (
        <Nav>
            <div>
                {showNewCustomerModal ? <NewCustomer close={setShowNewCustomerModal} submit={createCustomer}
                                                     loading={createCustomerResult.loading}
                                                     error={createCustomerResult.error}/> : null}
                <div className="mb-1">
                    <p className="font-bold text-2xl text-gray-700 inline">Customers</p>
                    <span className="float-right">
                        <span>
                            <button onClick={() => setShowNewCustomerModal(true)} type="button">
                                <svg className="w-8 h-8 inline-flex" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round"
                                                                              strokeWidth={2}
                                                                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                                New Customer
                            </button>
                    </span>
                    <span>
                        <button type="button">
                            <svg className="w-6 h-6 inline-flex" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                            Filter
                        </button>
                    </span>
                    </span>
                </div>
                <div className="py-4">
                    <form action="">
                        <input type="text" onChange={handleChange} className="border-2 p-3 w-full focus:outline-none text-gray-600" placeholder="Search by name or email or customer number or phone"/>
                    </form>
                </div>
                <div>
                    <CustomerList customersInfo={customersInfo}/>
                </div>
            </div>
        </Nav>
    );
}
