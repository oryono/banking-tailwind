import React from "react";
import {formatCurrency} from "../utils/currency";
import moment from "moment";

export function ShareList(props) {
    return (
        <div>
            {
                props.entries.map(entry => {
                    return <tr key={entry.id}>
                        <td>
                            {entry.transactionReference}
                        </td>
                        <td>
                            {entry.description}
                        </td>
                        <td>
                            {formatCurrency(entry.amount)}
                        </td>
                        <td>
                            { moment(entry.inserted_at).format('DD MMM YY h:mm')}
                        </td>
                    </tr>
                })
            }
        </div>

    )
}