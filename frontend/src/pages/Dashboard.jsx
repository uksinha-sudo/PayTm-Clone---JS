import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button"


export const Dashboard = () => {
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    }
    return (
        <>
            <div>Dashboard</div>
            <Button onClick={signOut} label={"Sign Out"} />
        </>
    )
}