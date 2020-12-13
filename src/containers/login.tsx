import React, {useState} from 'react';
import {Link, Redirect, useLocation} from "react-router-dom";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Loading} from "../components/Loading";
import Error from "../components/Error";

const SIGNIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!, $clientId: Int!) {
    signIn(email: $email, password: $password, clientId: $clientId) {
      token
      user {
        id
        email
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
  }
`;

export function Login(props) {
  const location = useLocation()
  // @ts-ignore
  let { from } = location.state || { from: { pathname: "/" } };
  const client = JSON.parse(localStorage.getItem("client"))
  const [login, { data, loading, error }] = useMutation(SIGNIN_MUTATION, {errorPolicy: "all"});
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleChange(event) {
    if (event.target.name === "email") {
      setEmail(event.target.value)
    }
    if (event.target.name === "password") {
      setPassword(event.target.value)
    }
  }

  if (loading) {
    return <Loading message="Logging in..."/>
  }

  if (data && data.signIn) {
    localStorage.setItem("token", data.signIn.token)
    localStorage.setItem("user", data.signIn.user.email)
    return <Redirect to={from}/>
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg"
            alt="Workflow"
          />

          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error ? <Error error={error}/> : null}
        <form className="mt-8" onSubmit={(e) => {e.preventDefault(); login({variables: {email: email, password: password, clientId: parseInt(client.id)}})}}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md">
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-gray focus:border-gray-300 sm:text-sm sm:leading-5"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="-mt-px">
              <input
                aria-label="Password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-gray focus:border-gray-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <label className="ml-2 block text-sm leading-5 text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm leading-5">
              <Link
                to="#"
                className="font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none transition duration-150 ease-in-out"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-green-500 group-hover:text-teal-400 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
