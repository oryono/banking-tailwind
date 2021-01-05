import React from 'react';
import './assets/main.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './containers/dashboard';
import { Customers } from './containers/customers';
import { Login } from './containers/login';
import { NotFound } from './components/NotFound';
import {gql, useQuery} from "@apollo/client";
import {Loading} from "./components/Loading";
import Error from "./components/Error";
import {Warning} from "./components/Warning";
import Customer from "./containers/customer";
import Account from "./containers/account";
import {AllLoans} from "./containers/allLoans";
import {Transactions} from "./containers/transactions";
import {Accounts} from "./containers/accounts";
import {TrialBalance} from "./containers/trialBalance";
import {Users} from "./containers/users";
import {WalletProducts} from "./containers/walletProducts";
import {LoanProducts} from "./containers/loanProducts";
import Loan from "./containers/loan";

const GET_CLIENT_QUERY = gql`
  query getClient($slug: String!) {
    client(slug: $slug) {
      id
      name
      phone
    }
  }
`



export default function App() {
  const client = window.location.host.split(".")[0]
  const response = useQuery(GET_CLIENT_QUERY, {variables: {slug: client}, fetchPolicy: "network-only"});


  React.useEffect(() => {
    if (response.data && response.data.client) {
      localStorage.setItem("client", JSON.stringify(response.data.client))
    }
  }, [response])

  if (response.loading) return <Loading message="Checking Client..."/>;
  if (response.error) return <Error error={response.error.message}/>;
  if (response.data.client == null) {
    return <Warning message="We don't recognize this client name. Please check your address bar."/>
  }
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/customers/:id" exact>
              <Customer />
            </Route>
            <Route path="/customers">
              <Customers />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/accounts/:id" exact>
              <Account />
            </Route>
            <Route path="/reports/accounts" exact>
              <Accounts />
            </Route>
            <Route path="/reports/trial-balance" exact>
              <TrialBalance />
            </Route>
            <Route path="/settings/users" exact>
              <Users />
            </Route>
            <Route path="/settings/wallet-products" exact>
              <WalletProducts />
            </Route>
            <Route path="/settings/loan-products" exact>
              <LoanProducts />
            </Route>
            <Route path="/loans/:id" exact>
              <Loan/>
            </Route>
            <Route path="/loans" exact>
              <AllLoans />
            </Route>
            <Route path="/reports/transactions" exact>
              <Transactions />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

