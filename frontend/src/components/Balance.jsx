import { useEffect, useState } from "react"
import axios from 'axios'
import { BACKEND_URL } from "../config";
export const Balance = () => {

    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function balance(){
            setLoading(true)
            try {
                const response = await axios.get(`${BACKEND_URL}account/balance`,{
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setLoading(false)
                setBalance(response.data.balance);

            } catch(e){
                console.log(e)
            }
        }
        balance();
    }, [])
    

    return (
        <>
        <div>
            {loading === true ? <p>Loading...</p> : <p className="font-semibold">Your balance <span className="ml-2">₹ {balance}</span></p>}
        </div>
        </>
    )
}