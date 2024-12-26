import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
function Login(props){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const userRef = useRef();
    const passRef = useRef();
    const [error, hasError] = useState("")
    const signIn = async () => {
        hasError("")
        const response = await fetch("https://vendify2.vercel.app/signIn", {
            method: "POST",
            headers: {"Content-Type" : 'application/json'},
            body : JSON.stringify({
                email: userRef.current.value,
                password: passRef.current.value
            })
        })
        const token = await response.json();
        if(token.error)
            { hasError(token.error)
                
            }
        else{
            localStorage.setItem('token', token.token);
            navigate('/')
    }
    }
    const signUp = async () => {
        hasError("")
        const response = await fetch("https://vendify2.vercel.app/signUp", {
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                email : userRef.current.value,
                password: passRef.current.value
            })
        })
        const resp = await response.json();
        if(resp.error) {hasError(resp.error)}
        else{
            // localStorage.setItem('hashedId', resp.id);
            //! now sending otp
            const optS = await fetch('https://vendify2.vercel.app/sendOtp', {
                method: "POST",
                headers:{"Content-Type" : "application/json"},
                body: JSON.stringify({
                    email : resp.email,
                    userId : resp.id
                })
            })
            const isSuccess = await optS.json();
            if(isSuccess.success){
                localStorage.setItem('hashedId', resp.id);
                navigate('/otpvalidation')
            }
            else{
                hasError(isSuccess.error)
            }
        }
    }
    return(
        <div className="w-[90%] h-[80%] bg-white rounded-2xl shadow-2xl flex flex-col p-4 justify-center items-center">
            <div className="poppins text-3xl  h-[20%] w-[100%] flex flex-row justify-center items-center">
                
                {props.signup == true ? <div className="text-black">Create an account</div> : <div className="text-black">Welcome back</div>}
            </div>
            <div className="h-[40%] w-[100%] space-y-1">
            
               <div className="space-y-1 w-[100%] h-[40%] flex flex-col justify-center items-center">
               <div className="text-black">Email</div>
                <input type="text" ref={userRef} placeholder="Enter your institute email" className="w-[70%] h-[50%] rounded-2xl border-[1px] border-black border-solid p-4"/>
               </div>
               <div className="space-y-1 w-[100%] h-[40%] flex flex-col justify-center items-center">
               <div className="text-black">Password</div>
                    <input type="password" ref={passRef} placeholder="Enter your password" className="w-[70%] h-[50%] rounded-2xl border-[1px] border-black border-solid p-4"/>
               </div>
               {error ? <div className="text-center text-red-500">{error} </div> : null}
            </div>
            {props.signup === true ? <div className=" text-black h-[10%] w-[80%] text-center">
                Already have an account ? <a href="/signin" className="text-blue-300"> Log in</a> now
            </div> : <div className="h-[10%] w-[80%] text-center text-black ">
                Dont have an account ? <a href="/signup" className="text-blue-300">Sign up</a> now
            </div>
            }
            <div className="h-[10%] w-[60%] flex flex-row justify-center items-center rounded-xl bg-black">
                <button className="h-[100%] w-[100%] text-white" onClick={props.signup == true ? signUp : signIn}> {props.signup == true ? <span>Sign up</span> : <span>Sign in</span>}</button>
            </div>
        </div>
    )
}

export default Login