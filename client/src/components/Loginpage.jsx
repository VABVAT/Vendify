import Login from "./Login"
import Vendify from '../public/Vendify.png'
function Loginpage(props){
    return(
        <div className='h-screen w-screen flex flex-row justify-center items-center bg-black'>
  <div className='w-[50%] h-[100%] flex flex-col'>
      <div className='font-serif font-bold text-4xl tracking-normal h-[20%] w-[100%]  flex flex-row justify-center items-center'>
        <div  >
        <span className="text-Gld  font-bold text-6xl"> VENDIFY </span>
        </div>
      </div>
      <div className='h-[70%] w-[100%] flex flex-row justify-center items-center'>
        
      </div>
  </div>
  <div className='w-[50%] h-screen bg-black flex flex-row justify-center items-center'>
    <Login signup={props.signup}/>
  </div>
</div>
    )
}

export default Loginpage