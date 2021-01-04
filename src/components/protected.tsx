import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import {gql, useQuery} from "@apollo/client";
import {Loading} from "./Loading";

const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    me {
      id
      clientId
      customer{
        id
        name
        accounts{
          name
          id
        }
      }
    }
  }
`;

export function Protected(props) {
  const location = useLocation()
  const {data, error, loading} = useQuery(GET_CURRENT_USER_QUERY, {fetchPolicy: "network-only"})

  if (loading) return <Loading />

  if (error) return <h1>An error occurred..</h1>

  if (data.me == null) {
    return <Redirect to={{ pathname: "/login", state: { from: location.pathname }}}/>;
  }
  return props.children;
}
