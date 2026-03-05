
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";


export const Dashboard = () => {
    
    return (
        <>
        <div className="h-screen w-screen justify-center items-center flex">

            <div className="h-200 w-300 shadow-2xl">
                <Appbar />
                <div className="ml-20 mt-10">

                <Balance />
                </div>
            </div>
        </div>
        </>
    )
}