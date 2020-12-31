import {Nav} from "../components/Nav";
import React from "react";

export function Users() {
    return (
        <Nav>
            <div>
                <div className="mb-4">
                    <p className="font-bold text-2xl text-gray-700 inline">Users</p>
                    <span className="float-right">
                        <button type="button">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                        </button>
                    </span>
                </div>
                <div>
                    Users List
                </div>
            </div>
        </Nav>
    )
}