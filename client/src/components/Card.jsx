import { useRef, useState } from "react"
import bsp from '../public/sbp.png'
import {jwtDecode} from 'jwt-decode'
export default function Card({image, price, email, description, name, ids}){
    const [detail, setDetail] = useState(false)
    const [newP, setNewP] = useState(false)
    const [Er, setEr] = useState('')
    const priceRef = useRef(0)
    async function makeOffer(offerPrice) {
        // console.log(ids)
        setEr('')
        if(offerPrice <= 0 || !offerPrice){
            setEr('Enter Valid offer price')
            // console.log('nah')
            return
        }
        
        const response = await fetch("https://vendify2.vercel.app/makeOffer", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                email: jwtDecode(localStorage.getItem('token')).email,
                sellerEmail: email,
                price: offerPrice,
                id: ids
            })
        })
        const res = await response.json();
        if(res.error){
            setEr(res.error)
            // console.log(res.error)
        }else{
            setDetail(false)
            setNewP(false)
            setEr('')
        }
    }

    return(
        <>
        <div className="p-6 m-4 h-[300px] w-[250px] shadow-xl bg-white border-2 border-solid border-black rounded-2xl ml-1 mr-1">
            <div className="w-[100%] h-[49%]  m-1 flex items-center justify-center">
                <div className="w-[50%] h-[100%]">
                <img src={image} className="w-[100%] h-[100%]" />
                </div>
            </div>
            <div className="m-1 h-[10%] align-middle"><span className="font-bold">Item name: </span><span >{name} </span></div>
            <div className="m-1 h-[10%] align-middle  text-clip truncate ..."> <span className="font-bold">sold by: </span> {email}</div>
            <div className="m-1 mb-2 h-[10%] align-middle" > <span className="font-bold">price: </span>{price}</div>
            
            <div className="flex justify-center items-center">
                <button className="bg-black transition-all duration-300 text-white h-[12%] p-2 rounded-2xl hover:bg-Gld border-2 border-black border-solid rounded-3xl hover:text-black w-[80%] pl-4 pr-4" onClick={() => setDetail(true)}>Details</button>
            </div>
        </div>
        <div>
        {detail === true ? <div className=" fixed inset-0 w-screen h-screen bg-black flex justify-center items-center z-10 bg-opacity-50">
            <div className="w-[50%] h-[70%] ">
                <div className="w-[90%] h-[7%] bg-white relative">
                    <div className="absolute top-0 right-0 h-[100%] w-[7%] ">
                        <button className="h-[100%] w-[100%] p-2" onClick={() => (setDetail(false))}>
                            <img src={bsp} alt="cross sign" className="w-[60%] h-[60%]"/>
                        </button>
                    </div>
                </div>
            <div className="w-[90%] h-[73%] bg-white  p-6 flex justify-center items-center">
                <div className="w-[50%] h-[100%] p-8 flex justify-center items-center">
                    <img src={image} alt="image" className="h-[90%] w-[100%]"/>
                </div>                
                <div className="w-[60%] h-[100%] flex flex-col  justify-center">
                    <div className="h-[10%] flex space-x-2 mb-2 overflow-auto">
                        <div className="font-bold text-l">Item name</div>
                        <div>{name}</div>
                    </div>
                    <div className="max-h-[13%] min-h-[10%] flex mb-2 overdflow-auto  space-x-2 ">
                        <div className="font-bold text-l">Email </div>
                        <div className="text-s text-center">{email}</div>
                    </div>
                    <div className="max-h-[50%] min-h-[10%] mb-2 overflow-auto flex space-x-2">
                        <div className="font-bold text-l">Description</div>
                        <div >{description}</div>
                    </div>
                    <div className="h-[10%] flex space-x-2  mb-2 overflow-auto">
                        <div className="font-bold text-l">Price</div>
                        <div>₹ {price}</div>
                    </div>
                    {Er !== ''? <div className="text-red-500">{Er}</div> : null}
                </div>
            </div>
            
            <div className="h-[20%] w-[90%] bg-white flex justify-center items-center p-6 space-x-2">
                
                <button className="p-4 bg-black w-[60%] text-white rounded-3xl hover:bg-Gld hover:text-black" onClick={() => makeOffer(price)}> Make offer at this price  </button>
                <button className="p-4 bg-black w-[60%] text-white rounded-3xl hover:bg-Gld hover:text-black" onClick={() => {setNewP(true); setEr('')}}> Negotiate  </button>
            </div>
            </div>
            </div> : null}
            {
                newP === true ? <><div className="fixed inset-0 w-screen h-screen bg-black flex justify-center items-center z-50 bg-opacity-50"> 
                        <div className="w-[40%] h-[30%]  space-x-2 flex justify-center items-center">
                            <div className="p-8 bg-Gld space-y-4 rounded-2xl">
                                <div className="h-[25px] w-[100%] relative">
                                    <div className="w-[10%] h-[100%]  absolute  right-0 top-0 p-2">
                                            <button className="w-[100%] h-[100%]" onClick={() => {setNewP(false); setEr('')}}>
                                                <img src={bsp} alt="" />
                                            </button>
                                    </div>
                                </div>
                                <div> <span className="font-bold">current price: ₹</span>{price}</div>
                                <div className="font-bold">Enter the new price</div>
                                <input type="number" ref={priceRef} className="w-[100%] p-2 border-2 border-black border-solid" />
                                <div className="flex items-center justify-center bg-black p-2 text-white">
                                    <button className="w-[100%]" onClick={() => makeOffer(priceRef.current.value)}>Confirm Action</button>
                                </div>
                                <div className="text-red-700">Disclaimer: You will be only able to make this offer once until a counter is made</div>
                                {Er !== '' ? <div className="text-red-700"> {Er} </div> : null}
                            </div>
                        </div>
                </div>
                </> : null
            }
        </div>

        </>
    )
}