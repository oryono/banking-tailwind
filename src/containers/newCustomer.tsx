import React, {useState} from "react";
import {ApolloError, gql, MutationFunctionOptions, MutationResult} from "@apollo/client";
import {formatCurrency} from "../utils/currency";
import Cookies from 'universal-cookie';
import {generateErrorMessage} from "../utils/errors";
const cookies = new Cookies();


interface FormData {
    name: string;
    phone: string;
    email: string;
    dob: string;
    village: string;
    district: string;
    country: string;
    gender: string;
    clientId?: number;
}

interface Props {
    submit(data: MutationFunctionOptions<any, FormData>): void;
    close: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean;
    error: ApolloError;
    data: any
}

export function NewCustomer({close, submit, error, loading, data}: Props) {
    const [form, setForm] = useState<FormData>({name: "", phone: "", email: "", dob: "", village: "", district: "", country: "", gender: ""})
    const client = JSON.parse(localStorage.getItem("client"))

    function handleChange(event) {
        const { name, value } = event.target;
        form[name] = value
        setForm({...form})
    }

    if (error) {
        const message = generateErrorMessage(error)
        console.log(message)
        const properties = {
            message: generateErrorMessage(error),
            type: "error"
        }
        cookies.set('toastProperties', JSON.stringify(properties), { path: '/' });
        window.location.reload();
    }

    if (data?.createCustomer) {
        const properties = {
            message: `Customer ${data.createCustomer.name} has been registered successfully.`,
            type: "success"
        }
        cookies.set('toastProperties', JSON.stringify(properties), { path: '/' });
        window.location.reload();
    }



    return (
        <div>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div
                            className="flex items-start justify-between px-6 py-4 border-b border-solid border-gray-300 rounded-t">
                            <h3 className="text-2xl font-semibold">
                                New Customer
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => close(false)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <form action="" onSubmit={(e) => {e.preventDefault(); submit({variables: {name: form.name, phone: form.phone, email: form.email, dob: form.dob, country: form.country, district: form.district, village: form.village, gender: form.gender, clientId: parseInt(client.id)}})}}>
                            <div className="relative px-6 flex-auto">
                                <div className="flex">
                                    <div className="my-2 text-gray-600 text-lg leading-relaxed w-full">
                                        <label htmlFor="">
                                            Name
                                        </label>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            onChange={handleChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                        />
                                    </div>

                                    <div className="my-2 ml-1 text-gray-600 text-lg leading-relaxed w-full">
                                        <label htmlFor="">
                                            Phone
                                        </label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            required
                                            placeholder="256123456789"
                                            pattern="^(256)[0-9]{3}\d{6}$"
                                            onChange={handleChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="my-2 text-gray-600 text-lg leading-relaxed w-full">
                                        <label htmlFor="">
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="user@domain.com"
                                            onChange={handleChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                    <div className="ml-1 mb-2 my-2 text-gray-600 text-lg leading-relaxed w-full">
                                        <label htmlFor="">
                                            Date of birth
                                        </label>
                                        <input
                                            name="dob"
                                            type="date"
                                            required
                                            onChange={handleChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                        />
                                    </div>

                                </div>

                                <div className="flex">
                                    <div className="my-2 text-gray-600 text-lg leading-relaxed w-full">
                                        <label htmlFor="">
                                            village
                                        </label>
                                        <input
                                            name="village"
                                            type="text"
                                            required
                                            onChange={handleChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                        />
                                    </div>

                                    <div className="ml-1 my-2 text-gray-600 text-lg leading-relaxed w-full">
                                        <label htmlFor="">
                                            District
                                        </label>
                                        <input
                                            name="district"
                                            type="text"
                                            required
                                            onChange={handleChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                        <label htmlFor="">
                                            Gender
                                        </label>
                                        <select
                                            required
                                            onChange={handleChange}
                                            name="gender"
                                            className="block appearance-none border border-gray-200 text-gray-700 px-3 py-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                            <option value="">Select</option>
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                        </select>
                                    </div>
                                    <div className="ml-1 relative flex w-full flex-wrap items-stretch text-gray-600 text-lg">
                                        <label htmlFor="">
                                            Country
                                        </label>
                                        <select
                                            required
                                            onChange={handleChange}
                                            name="country"
                                            className="block appearance-none border border-gray-200 text-gray-700 px-3 py-3 bg-white leading-tight focus:outline-none focus:bg-white focus:border-blue-300 w-full">
                                            <option value="">Select</option>
                                            <option value="Uganda">Uganda</option>
                                        </select>
                                        <div
                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                            {/*<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"*/}
                                            {/*     xmlns="http://www.w3.org/2000/svg">*/}
                                            {/*    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}*/}
                                            {/*          d="M19 9l-7 7-7-7"/>*/}
                                            {/*</svg>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-3 rounded-b">
                                <button
                                    className="bg-green-500 text-white active:bg-green-600 text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Submit Information
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
        </div>
    )
}