import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button"
export const SignOutModal = () => {
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    }
    return (
        <>
        <div>
            <Button onClick={signOut} label={"Sign Out"} />
        </div>
        </>
    )
}