import { useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { InputBox } from './InputBox'
import axios from 'axios';
import { BACKEND_URL } from '../config';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [Query, setQuery] = useState('');
    // const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const timer = setTimeout(async() => {
            try{
                const response = await axios.post(`${BACKEND_URL}user/bulk?filter=${Query}`, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setUsers(response.data.users)
            } catch(e){
                console.log(e)
            }
        }, 3000); // debounce delay
        return () => clearTimeout(timer);
    }, [Query]);




    return (
        <>
            <h3 className="font-bold">Users</h3>
            <InputBox styles={"w-[58vw] "} placeholder='Search Users...' onChange={(e) => setQuery(e.target.value)} />
            <Button label={"Search"} styles={"ml-2"}  />

            <div className="mt-6 font-semibold">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center mt-3"
                    >
                        <div>{user.firstName} {user.lastName}</div>

                        <div className="mr-4">
                            <Button label={"Send Money"} styles={"w-40"} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};