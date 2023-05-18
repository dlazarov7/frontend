import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext,{UserContext} from "../Contex/AuthContext";

interface LoginProps{
    setIsLoged:(isLoged:boolean)=>void
    setCurrentUserData:(currentUserData:{fullName:string})=>void 
}

export default function Login({setIsLoged,setCurrentUserData}:LoginProps) {
    
    const currUserContext=useContext(UserContext);
    const isLoged=useContext(AuthContext);
    const [userData, setUserData] = useState<{ email: string, password: string }>({ email: "", password: "" });


    const handleChangeUserData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const newUserData = e.target.value
        setUserData({ ...userData, [name]: newUserData })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("http://localhost:4000/login", userData)
            .then(res => {
                if (res.status === 200) {
                    setCurrentUserData({ ...currUserContext, fullName: `${res.data.firstName} ${res.data.lastName}` })
                    setIsLoged(true);
                }
            })
            .catch(err => alert("User not found"));
    }

    const handleLogout = () => {
        axios.post(`http://localhost:4000/logout`)
            .then(res => {
                if (res.status === 200) {
                    setCurrentUserData({ ...currUserContext, fullName: "" })
                    setIsLoged(false);
                    alert('Successful logout')
                }
            })
            .catch(err => alert('Could not log out'));
    }
    return (
        <div className="homePage">

            <form action="submit" onSubmit={handleSubmit}>
                <input placeholder="Email..." type="email" name="email" value={userData.email} onChange={handleChangeUserData} /><br />
                <input placeholder="Password..." type="password" name="password" value={userData.password} onChange={handleChangeUserData} /><br />
                <button>Login</button><br />
            </form>
            {isLoged ?
                <>
                    <span>{currUserContext.fullName}</span><br />

                    {
                        <button onClick={handleLogout}>Logout</button>
                    }
                </>
                : null

            }


        </div>
    );

}