import { useEffect, useState } from "react"
import Skeleton from "./Skeleton";
import Card from "./Card";
import im2 from '../public/im2.png'
export default function ContentContainer(){
    const [loader, setLoader] = useState(true);
    const [prods, setprods] = useState([]);
    const [open, setOpen] = useState(false);
    function toggle(){
        setOpen((prev) => (!prev))
    }

    function sortLow() {
        const sortedProds = [...prods].sort((a, b) => (a.price - b.price));
        setprods(sortedProds);
    }
    
    function sortHigh() {
        const sortedProds = [...prods].sort((a, b) => b.price - a.price);
        setprods(sortedProds);
    }

    useEffect(() => {
        async function getItem() {
            setLoader(true)
            try{
            const response = await fetch('https://vendify2.vercel.app/listing', {
                method : "GET"
            })
            const itemsArray = await response.json();
            if(!itemsArray.products) throw new Error("something went wrong")
            else{
                setprods(itemsArray.products)
                // console.log(itemsArray.products)
                setLoader(false)
            }
            }catch(e){

            }
        } 
        getItem();
    }, [])
    return(
        <div className="bg-Gld rounded-2xl">
            {loader === false ? <div className="w-[100%] bg-Gld h-[32px]">
                <button className="ml-8  mb-4" onClick={toggle}>
                    <img src={im2} className="h-[20px]" />
                </button>
                {open === true ? <div className="z-10 "> 
                    <div className="absolute mb-2 bg-white hover:bg-gray-200">
                        <button className="z-40" onClick={sortLow}> Sort price: Low to high</button>
                    </div>
                    <br />
                    <div className=" absolute bg-white hover:bg-gray-200">
                        <button className="z-40" onClick={sortHigh}>Sort price: High to low</button>
                    </div>
                </div> : null}
            </div> : null}
            <div className="flex flex-wrap p-4  border-2 border-solid border-black w-[100%] bg-Gld mt-4 space-x-3 justify-center h-[400px] overflow-y-auto items-center place-items-start rounded-2xl">
                {loader === true ? Array.from({length: 8}, (product, index) => (<Skeleton key={product}/>)) : prods.map((prods, index) => (<div><Card image={prods.image} email={prods.soldBy} price={prods.price} name={prods.name}/></div>))}
            </div>
        </div>
    )
}