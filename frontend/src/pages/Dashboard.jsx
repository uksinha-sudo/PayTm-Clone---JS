
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";


export const Dashboard = () => {

    return (
        <>
            <div className="h-screen w-screen justify-center items-center flex">

                <div className="h-200 w-300 shadow-2xl">
                    <Appbar />
                    <div className="ml-20 mt-10">
                        <Balance />
                    </div>
                    <hr className="h-1 mt-4 w-250 m-auto opacity-20 "/>
                    <div className="flex flex-col ml-20 mt-5">
                        <Users />
                    </div>
                </div>
            </div>
        </>
    )
}