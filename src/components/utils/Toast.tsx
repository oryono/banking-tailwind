import React, {useState} from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function Toast() {
    const [showToast, setShowToast] = useState(true)
    const toastProperties = cookies.get("toastProperties")

    React.useEffect(() => {
        const interval = setInterval(() => {
            closeToast()
        }, 5000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    function closeToast() {
        cookies.remove("toastProperties", { path: '/' })
        setShowToast(false)
    }

    function title() {
        if (toastProperties.type === "success") {
            return "Success"
        }
        return "Error"
    }

    return ((showToast && !!toastProperties) && <div className="fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm">
        <div
            className="close cursor-pointer w-full p-3 bg-green-500 rounded shadow-lg text-white">
            <div>
                <div className="flex justify-between">
                    <span className="font-semibold">{title()}</span>
                    <button onClick={() => closeToast()}>
                        <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18"
                             height="18"
                             viewBox="0 0 18 18">
                            <path
                                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                        </svg>
                    </button>
                </div>

                <div>{toastProperties.message}</div>
            </div>


        </div>

    </div>)
}