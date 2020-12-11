import React, {useState} from "react";
import {Nav} from "../components/Nav";
import {gql, useQuery} from "@apollo/client";
import {CustomerPage} from "./customerPage";
import { withRouter } from "react-router-dom";

const GET_CUSTOMER_QUERY = gql`
    query getCustomer($customerId: Int!) {
        customer(customerId: $customerId) {
            id
            name
            email
            phone
            accounts {
                id
                name
                accountNumber
                customer {
                    id
                }
            }
        }
    }
`;

function Customer(props) {
    const [customerId, setCustomerId] = useState(parseInt(props.match.params.id))
    React.useEffect(() => {
        setCustomerId(customerId)
    }, [customerId])
    const customerInfo = useQuery(GET_CUSTOMER_QUERY, {variables: {customerId: customerId}})

    return (
        <Nav>
            <div>
                <CustomerPage customerInfo={customerInfo} customerId={customerId}/>
            </div>
        </Nav>
    )
}

export default withRouter(Customer)