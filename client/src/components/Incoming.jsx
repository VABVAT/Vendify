import { useEffect, useState } from "react"
import {jwtDecode} from 'jwt-decode'
import Header from "./Header"
import { useNavigate } from "react-router-dom"
import InpOup from "./InpOup"

export default function Incoming(){
    const [list, setList] = useState([])
    const Navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            if(!token || (jwtDecode(token).exp*1000 < Date.now())) Navigate('/signup')
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        async function getOffers() {
            const offers1 = await fetch("https://vendify2.vercel.app/getOffers", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: jwtDecode(localStorage.getItem('token')).email
                })
            }) 
            const offers = await offers1.json();
            setList(offers.offers)
        }
            getOffers()
    }, [])

    return (
        <div className="min-w-screen min-h-screen bg-black">
        <Header />
        <div className="w-[100%] h-[100%] p-4">
            <h1 className="text-2xl font-bold mb-4">Incoming Offers</h1>
            <div className="w-[100%] flex flex-col justify-center items-center">
                {list.map((prod, index) => (
                            <InpOup sendMode={true} prod={prod} index={index}/>
                ))}
            </div>
        </div>
    </div>
    )
}