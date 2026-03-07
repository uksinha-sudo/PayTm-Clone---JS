import { useState } from "react"
import { SignOutModal } from "./SignOutModal";
import { Users } from "./Users";


export const Appbar = () => {
    const [signOutModal, setSignOutModal] = useState(false);

    function signOutModalControl() {
        setSignOutModal(!signOutModal);
    }

    return (
        <>
            <div className="flex flex-col">

                <div className="flex items-center w-260 h-10 shadow mt-20 ml-20 justify-between select-none mr-20">
                    <p className="p-2">PayTM App</p>
                    <div className="flex gap-4 items-center">
                        <p>Hello</p>
                        <div className="bg-gray-200 hover:bg-gray-300 transition-all w-10 h-10 text-black rounded-full shrink-0 p-2 flex justify-center font-semibold cursor-pointer select-none" onClick={signOutModalControl}>
                            U
                        </div>
                    </div>
                </div>

            </div>
                {signOutModal === true && <div className="h-50 w-50 absolute top-50 right-60 flex items-center justify-center shadow-2xl select-none">
                    <div className="p-2">
                        <SignOutModal />
                    </div>
                </div>}
        </>
    )
}