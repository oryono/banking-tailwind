import React, {useState} from "react";
import Chart from "react-google-charts";
import {PuffLoader} from "react-spinners";

export function Monthly(props) {
    const [chartData, setChartData] = useState([])

    React.useEffect(() => {
        const keys = []
        const values = []
        const entries = [['Month', 'Deposits', 'Withdraws', 'Transfers']]

        props.transactions.forEach(function (transaction) {
            const key = Object.keys(transaction)
            const value = Object.values(transaction)
            keys.push(key[0])
            values.push(value[0])
        })

        for (let i = 0; i < values.length; i += 1) {
            entries.push([keys[i], values[i].deposits, values[i].withdraws, values[i].transfers])
        }

        setChartData(entries)
    }, [])


    return (
        <div className="p-4 rounded overflow-hidden shadow-lg h-auto">
            <Chart
                width={'100%'}
                height={'60vh'}
                chartType="Bar"
                loader={<div className="flex">
                    <div className="m-auto flex flex-col justify-evenly items-center"><PuffLoader/><p className="text-gray-500">Loading chart...</p></div>
                </div>}
                data={chartData}
                options={{
                    colors: ['#9ae6b4', '#fbb6ce', '#a0aec0'],
                    chart: {
                        title: 'Monthly Savings Transactions',
                        subtitle: 'Deposits, Withdraws, and Transfers: Past 12 months',

                    },
                }}
            />
        </div>

    )
}