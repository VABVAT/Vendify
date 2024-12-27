import { useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate()
    const signOut = () => {
        try{
            localStorage.removeItem('token')
        }catch(e){
            navigate('/signin')
        }
    }
    
    const list = () => {
        navigate('/listing')
    }

    const goList = () => {
        const token = localStorage.getItem('token')
        if(token) navigate('/seller')
        else navigate('/signup')
    }

    return(
        <div className="h-[25%] w-[100%] flex p-8 bg-black border-b-2 border-b-gray-200 ">
            <div className="w-[50%] h-[100%]  font-bold flex items-center justify-center">
                <button onClick={() => navigate('/')}>
                 <div className="font-bh text-white text-6xl"> VENDIFY </div>
                 </button>
            </div>
            <div className=" w-[50%] flex flex-wrap justify-center items-center justify-center space-x-8 ">
            <button className="font-poppins font-bold transition-all duration-300  text-black p-2  text-xs shadow-2xl bg-white hover:bg-Gld transtion-all duration-500" onClick={() => navigate('/Sending')} >Sent offers</button>
            <button className="font-poppins font-bold transition-all duration-300  text-black p-2  text-xs shadow-2xl bg-white hover:bg-Gld transtion-all duration-500" onClick={() => (navigate('/incoming'))}>Incoming offers</button>
            <button className="font-poppins font-bold transition-all duration-300  text-black p-2  text-xs shadow-2xl bg-white hover:bg-Gld transtion-all duration-500" onClick={list}>Edit your listings</button>
            <button className="font-poppins font-bold transition-all  duration-300  text-black p-2  text-xs shadow-2xl bg-white hover:bg-Gld transtion-all duration-500" onClick={goList}>Create a listing</button>
            <button className="font-poppins font-bold transition-all duration-300  text-black p-2  text-xs shadow-2xl bg-white hover:bg-Gld transtion-all duration-500" onClick={signOut} >Sign out</button>
            </div>
        </div>
    )
}