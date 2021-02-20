import React, {useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {Loading} from "../components/Loading";
import Error from "../components/Error";
import {Chart} from "react-google-charts";
import {PuffLoader} from "react-spinners";


const GET_CUSTOMER_SUMMARY = gql`
    query{
      customerSummary {
        summary
      }
    }
`

export function CustomerSummary() {
    const {error, loading, data} = useQuery(GET_CUSTOMER_SUMMARY)
    const [chartData, setChartData] = useState()

    React.useEffect(() => {
        if (data) {
            setChartData([...[['Task', 'Hours per Day']], ...data.customerSummary.summary])
        }
    }, [data])

    console.log(chartData)

    if (loading) return <Loading message="Loading customer summary"/>
    if (error) return <Error error={error}/>

    return (
        <div className="p-4 rounded w-1/2 overflow-hidden shadow-lg h-auto">
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div className="flex">
                    <div className="m-auto flex flex-col justify-evenly items-center"><PuffLoader/><p className="text-gray-500">Loading chart...</p></div>
                </div>}
                data={chartData}
                options={{
                    pieHole: 0.4,
                    colors: ['#bee3f8', 'pink'],
                    title: 'Customers by Gender',
                }}
            />
        </div>
    )
}