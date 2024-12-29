import { useEffect, useState } from "react"
import {jwtDecode} from 'jwt-decode'
import Header from "./Header"
import InpOup from "./InpOup"
export default function Transactions(){
    const [prods, setProds] = useState([])
    async function getOffers() {
        const response = await fetch("https://vendify2.vercel.app/transactions", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email : jwtDecode(localStorage.getItem('token')).email
            })
        })
        const res = await response.json();
        setProds(res.offers)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getOffers();
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        getOffers();
    }, [])

    return(
        <div className="min-w-screen min-h-screen">
        <Header />
        {
            prods.map((prod, index) => (<div className="flex justify-center items-center">  <InpOup prod={prod} index={index} tra={true} /> </div>))
        }
        
        </div>
    )
}