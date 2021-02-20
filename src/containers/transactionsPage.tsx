import React, {useState} from "react";
import {QueryResult} from "@apollo/client";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {Entries} from "./entries";


type Type = "credit" | "debit"
type Description = "Deposit"

interface Filter {
    transactionReference: string;
    type: Type;
    description: Description;
}

export function TransactionsPage({entriesInfo, setFilters}: { entriesInfo: QueryResult, setFilters }) {
    const [hasMore, setHasMore] = useState(true)
    if (entriesInfo.loading) return <Loading message="Loading transactions"/>
    if (entriesInfo.error) return <Error error={entriesInfo.error}/>

    return (
        <div className="mb-4">
            <div>
                <Entries entries={entriesInfo.data.entries}/>
                <button onClick={() => entriesInfo.fetchMore({
                    variables: {offset: entriesInfo.data.entries.length},
                    updateQuery: (previousResult, {fetchMoreResult}) => {
                        if (!fetchMoreResult) return previousResult;

                        if (fetchMoreResult.entries.length < 100) {
                            setHasMore(false)
                        }
                        return {
                            entries: [
                                ...previousResult.entries,
                                ...fetchMoreResult.entries
                            ]
                        }
                    }
                })} disabled={!hasMore} className="p-1 mt-2 mb-3 rounded border border-blue-400 text-blue-400 float-right">See More
                </button>
            </div>
        </div>
    )
}