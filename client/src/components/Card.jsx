export default function Card({image, price, email, description, name}){
    return(
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
                <button className="bg-black transition-all duration-300 text-white h-[12%] p-2 rounded-2xl hover:bg-Gld border-2 border-black border-solid rounded-3xl hover:text-black pl-4 pr-4">Details</button>
            </div>
        </div>
    )
}