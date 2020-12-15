import React from "react";
import {EntryRow} from "../components/EntryRow";

export function Entries({entries}) {
    return (
        <div className="my-2">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                    <tr>
                        <th className="px-6 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Reference
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Account
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Running Balance
                        </th>

                        <th className="px-4 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Time
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {
                        entries.map(entry => <EntryRow  key={entry.id} entry={entry}/>)
                    }
                    </tbody>
                </table>
            </div>
        </div>

    )
}