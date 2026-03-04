import { useRef } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"


export const SignIn = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    async function signin(){
        const username = emailRef.current?.value;
        const password = passwordRef.current?.value;
        try{

            const response = await axios.post(`${BACKEND_URL}user/signin`, {
                username,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            alert(response.data.message);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch(error){
            if(error.response){
                alert(error.response.data.message);
            } else {
                alert("Something went wrong")
            }
        }

    }


    return (
        <div className="flex h-screen w-screen items-center justify-center bg-black/50 p-10">
            <div className="flex max-h-180 max-w-110 p-4 bg-white rounded-2xl shadow-2xl flex-col items-center">
                <div className=" text-center">
                    <Heading lable={"Sign In"} />
                    <SubHeading lable={"Enter your credentials to access your account"} />
                </div>
                <div className="flex flex-col mt-2 gap-5 items-center">
                    <InputBox reference={emailRef} type={"email"} label={"Email"} placeholder="johndoe@example.com" />
                    <InputBox reference={passwordRef} type={"password"} label={"Password"} placeholder="" />
                    <Button onClick={signin} label={"Sign In"} styles={"w-90 mt-4"} />
                    <p>Don't have an account? <a href="/signup" className="ml-1 underline">Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}