import { useRef } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from 'axios'
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"


export const SignUp = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();

    async function signup() {
        try {

            const username = emailRef.current?.value;
            const firstName = firstNameRef.current?.value;
            const lastName = lastNameRef.current?.value;
            const password = passwordRef.current?.value;

            const response = await axios.post(`${BACKEND_URL}user/signup`, {
                username,
                firstName,
                lastName,
                password
            });
            alert(response.data.message);
            navigate("/signin");
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something Went Wrong")
            }

        }

    }

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-black/50 p-10">
            <div className="flex max-h-180 max-w-110 p-3 bg-white rounded-2xl shadow-2xl flex-col items-center">
                <div className=" text-center">
                    <Heading lable={"Sign Up"} />
                    <SubHeading lable={"Enter your information to create an account"} />
                </div>
                <div className="flex flex-col mt-2 gap-5 items-center">
                    <InputBox reference={firstNameRef} type={"text"} label={"First Name"} />
                    <InputBox reference={lastNameRef} type={"text"} label={"Last Name"} placeholder="Doe" />
                    <InputBox reference={emailRef} type={"email"} label={"Email"} placeholder="johndoe@example.com" />
                    <InputBox reference={passwordRef} type={"password"} label={"Password"} placeholder="" />
                    <Button onClick={signup} label={"Sign Up"} styles={"w-90 mt-4"} />
                    <p>Already Have an Account? <a href="/signin" className="ml-1 underline">Login</a></p>
                </div>
            </div>
        </div>
    )
}