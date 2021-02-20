import React, {useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {Chart} from "react-google-charts";
import {PuffLoader} from "react-spinners";


const GET_NEW_MONTHLY_CUSTOMERS_QUERY = gql`
    query{
      newMonthlyCustomers {
        newCustomers
      }
    }
`

export function NewMonthlyCustomers() {
    const {error, loading, data} = useQuery(GET_NEW_MONTHLY_CUSTOMERS_QUERY)
    const [chartData, setChartData] = useState([])

    React.useEffect(() => {
        const keys = []
        const values = []
        const entries = [['Month', 'New Customers']]

        data?.newMonthlyCustomers.newCustomers.forEach(function (customer) {
            const key = Object.keys(customer)
            const value = Object.values(customer)
            keys.push(key[0])
            values.push(value[0])
        })

        for (let i = 0; i < values.length; i += 1) {
            entries.push([keys[i], values[i]])
        }

        setChartData(entries)
    }, [data])

    console.log(chartData)
    return (
        <div className="p-4 rounded overflow-hidden shadow-lg h-auto">
            <Chart
                width={'100%'}
                height={'400px'}
                chartType="Line"
                loader={<div className="flex">
                    <div className="m-auto flex flex-col justify-evenly items-center"><PuffLoader/><p className="text-gray-500">Loading chart...</p></div>
                </div>}
                data={chartData}
                options={{
                    chart: {
                        title: 'New Monthly Customers',
                        subtitle: 'For the past 12 months',
                    },
                }}
            />
        </div>
    )
}