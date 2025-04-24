// import { ButtonWarning } from "../components/ButtomWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { ButtonWarning } from "../components/ButtonWarning";
import { Button } from "../components/Button";
import { Appbar } from '../components/Appbar'
import { useNavigate } from "react-router-dom";
// import { axios } from "axios";
import axios from "axios";
import { useState } from "react";

export function Signin()
{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [signupMessage,setSignupMessage] = useState("");
    const [signupSuccessFlag,setSignupSuccessFlag] = useState(false);
    const [signupErrorFlag,setSignupErrorFlag] = useState(false);
    const [signupErrorMessage,setSignupErrorMessage] = useState("");

     const navigate = useNavigate();        
                
    return <div>
        <Appbar/>
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                 <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"}/>
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox label={"Email"} placeholder={"enter your username"} onChange={(e)=>setUsername(e.target.value)}/>
                <InputBox label={"Password"} onChange={(e)=>setPassword(e.target.value)} placeholder={"Enter your password"}/>
                <Button onClick={async () => {
                                   
                                   const response = await axios.post("http://localhost:8080/api/v1/user/signin", {
                                    username,
                                    password
                                   });
                                   console.log(response.data.token);
                                   
                                   if (response.data.token) {
                                       localStorage.setItem("token", response.data.token);
                                       localStorage.setItem("username", username);
                                       navigate("/dashboard"); 
                                   } else {
                                   alert(response.data.message || "Sign-in failed"); 
                                   }
                               
                               
                           }} label={"Sign in"} />
                <ButtonWarning label={"Don't have an account?"} to={'/signup'} buttonText={"sign up"}/>
            </div>

        </div>

    </div>
    </div>
}