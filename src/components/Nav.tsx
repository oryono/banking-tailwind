import React from 'react';
import {Protected} from './protected';
import {NavLink} from "react-router-dom";
import {auth} from "../utils/auth";

export function Nav({children}) {
    return (
        <Protected>
            <div className="flex">
                <div className="w-1/5 bg-gray-200 h-screen overflow-y-scroll px-8 py-2 flex flex-col justify-between">
                    <div>
                        <div className="py-4 flex items-center">
                            <img
                                className="h-12 w-12 rounded-full"
                                src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg"
                                alt=""
                            />
                            <p className="ml-2">Banking</p>
                        </div>
                        <ul>
                            <li className="py-2 px-4 w-full hover:bg-gray-400 rounded">
                                <NavLink to="/" className="block" exact activeStyle={{
                                    fontWeight: "bold",
                                }}>
                                    <div className="flex">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                        </svg>
                                        <p className="ml-2">Dashboard</p>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="py-2 px-4 w-full hover:bg-gray-400 rounded">
                                <NavLink to="/customers" className="block" activeStyle={{
                                    fontWeight: "bold",
                                }}>
                                    <div className="flex">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                        </svg>
                                        <p className="ml-2">
                                            Customers
                                        </p>
                                    </div>

                                </NavLink>
                            </li>

                            <li className="py-2 px-4 w-full hover:bg-gray-400 rounded">
                                <NavLink to="/loans" className="block" activeStyle={{
                                    fontWeight: "bold",
                                }}>
                                    <div className="flex">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                                        </svg>
                                        <p className="ml-2">
                                            Loans
                                        </p>
                                    </div>

                                </NavLink>
                            </li>

                            <li className="py-2 px-4 w-full hover:bg-gray-400 rounded group">
                                <div className="block cursor-pointer">
                                    <div className="flex">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                        </svg>
                                        <p className="ml-2">
                                            Reports
                                        </p>
                                    </div>
                                </div>
                                <ul className="absolute rounded hidden text-gray-700 pt-1 group-hover:block w-40 shadow-xl ml-16">
                                    <li className="">
                                        <NavLink
                                            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                            to="/reports/transactions"
                                        >Transactions</NavLink
                                        >
                                    </li>

                                    <li className="">
                                        <NavLink
                                            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                            to="/reports/accounts"
                                        >Accounts</NavLink
                                        >
                                    </li>

                                    <li className="">
                                        <NavLink
                                            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                            to="/reports/trial-balance"
                                        >Trial Balance</NavLink
                                        >
                                    </li>
                                </ul>
                            </li>
                            <li className="py-2 px-4 w-full hover:bg-gray-400 rounded group">
                                <div className="block cursor-pointer">
                                    <div className="flex">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                                        </svg>
                                        <p className="ml-2">
                                            Settings
                                        </p>
                                    </div>
                                </div>
                                <ul className="absolute rounded hidden text-gray-700 pt-1 group-hover:block w-40 shadow-xl ml-16">
                                    <li className="">
                                        <NavLink
                                            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                            to="/settings/users"
                                        >Users</NavLink
                                        >
                                    </li>

                                    <li className="">
                                        <NavLink
                                            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                            to="/settings/wallet-products"
                                        >Wallet Products</NavLink
                                        >
                                    </li>

                                    <li className="">
                                        <NavLink
                                            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                            to="/settings/loan-products"
                                        >Loan Products</NavLink
                                        >
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-between items-center border-t pt-4">
                        <div className="flex items-center justify-between">
                            <img
                                className="h-10 w-10 rounded-full"
                                src="https://picsum.photos/200"
                                alt=""
                            />
                            <div className="flex flex-col">
                                <p className="text-gray-900 text-sm font-semibold ml-2">{ auth()}</p>
                                <p className="text-gray-900 text-sm font-semibold ml-2">{JSON.parse(localStorage.getItem("client")).name}</p>
                            </div>
                        </div>
                        <div>
                            <NavLink to="#">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="w-4/5 h-screen overflow-y-scroll p-4">
                    <main>{children}</main>
                </div>
            </div>
        </Protected>
    );
}
