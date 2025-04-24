import { useEffect, useState } from "react";
import {Appbar} from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export function Dashboard()
{
    const [balance, setBalance] = useState(0);

    const getBalance = async() => {
        const response = await axios.get("http://localhost:8080/api/v1/account/balance",{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        } )

        setBalance(response.data.balance);
    }

    useEffect(() => {
        getBalance()
    },[])


    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance amount={balance}/>
            <Users/>
        </div>

    </div>
    
}