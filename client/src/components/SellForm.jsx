import { useState, useRef, useEffect } from "react";
import i1 from "../public/image.png"
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'
import Header from "./Header";
export default function SellForm() {
    const fileRef = useRef(null);
    const dscRef = useRef('');
    const priceRef = useRef(0);
    const nameRef = useRef('');
    const Navigate = useNavigate()
    const [err, setErr] = useState('')
    const [Done, setDone] = useState(false)
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            if(!token || (jwtDecode(token).exp*1000 < Date.now())) Navigate('/signup')
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("https://vendify2.vercel.app/postListing", {
            method: "POST",
            headers: {"Content-Type" : 'application/json'},
            body:JSON.stringify({
                email: jwtDecode(localStorage.getItem('token')).email,
                price: priceRef.current.value,
                description: dscRef.current.value,
                image: fileRef.current,
                name: nameRef.current.value
            })
        })
        const res = await response.json()
        if(!res.error){
            setDone(true)
        }else{
            setErr(res.error)
        }
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            fileRef.current = reader.result;
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="flex flex-col h-screen">
        <Header />

        <form
            onSubmit={handleSubmit}
            className="bg-Gld p-8 rounded-lg shadow-lg max-w-md mx-auto mt-10"
        >
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                Create Listing
            </h2>
            <div className="mb-4">
                <input
                    type="text"
                    required
                    ref={nameRef}
                    placeholder="Product Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    required
                    ref={dscRef}
                    placeholder="Description"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>
            <div className="mb-4">
                <input
                    type="number"
                    required
                    ref={priceRef}
                    placeholder="Price"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>
            <div className="mb-6">
                <div>Add image of product</div>
                    <input
                        type="file"
                        required
                        onChange={handleFileChange}   
                    />
            </div>
            <button
                type="submit"
                className="w-full p-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            >
                Create Listing
            </button>
        </form>
        </div>
    );
}
