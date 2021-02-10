import React from "react";
import {EntryRow} from "../components/EntryRow";
import {CSVLink} from "react-csv";
import {formatCurrency} from "../utils/currency";
import moment from "moment";

import * as jsPDF from "jspdf"
import "jspdf-autotable"
import {titleCase} from "../utils/cases";

export function Entries({entries}) {
    const cleanEntries = entries.map(
        entry => {
            return {
                amount: formatCurrency(entry.amount),
                insertedAt: moment(entry.insertedAt).format('ddd, MMM Do, YY HH:mm'),
                transactionReference: entry.transactionReference,
                description: titleCase(entry.description),
                type: titleCase(entry.type),
                runningBalance: formatCurrency(entry.runningBalance)
            }
        }
    )
    const headers = [
        {label: "Transaction Reference", key: "transactionReference"},
        {label: "Description", key: "description"},
        {label: "Amount", key: "amount"},
        {label: "Type", key: "type"},
        {label: "Transaction Date", key: "insertedAt"},
        {label: 'Running Balance', key: 'runningBalance'}
    ];

    const exportPDF = () => {
        const header = function (data) {
            doc.setFontSize(18);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            doc.text(`Account Statement`, data.settings.margin.left, 20);
        };
        const doc = new jsPDF({orientation: 'l'})

        doc.autoTable({
            columns: [
                {header: 'Transaction Reference', dataKey: 'transactionReference'},
                {header: 'Amount', dataKey: 'amount'},
                {header: 'Description', dataKey: 'description'},
                {header: 'Type', dataKey: 'type'},
                {header: 'Transaction Date', dataKey: 'insertedAt'},
                {header: 'Running Balance', dataKey: 'runningBalance'},

            ],
            body: cleanEntries,
            margin: {top: 25}, beforePageContent: header,
        })

        doc.save('account-statement.pdf')
    }

    return (
        <div className="my-2">
            <span className="">
                    <button className="pr-1" onClick={() => exportPDF()}>
<svg className="w-6 h-6 inline" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                        PDF
                    </button>

                <CSVLink data={cleanEntries} filename="account_statement.csv" headers={headers}>
                    <svg className="w-6 h-6 inline" fill="none" stroke="green"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                        CSV
                </CSVLink>
            </span>
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
                        entries.map(entry => <EntryRow key={entry.id} entry={entry}/>)
                    }
                    </tbody>
                </table>
            </div>
        </div>

    )
}