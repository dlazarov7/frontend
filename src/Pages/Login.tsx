import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Login() {
    const [userData, setUserData] = useState<{ email: string, password: string }>({ email: "", password: "" });
    const [currentUser, setCurrentUser] = useState<{ fullName: string }>({ fullName: "" });
    const [isUSerLogged, setISUserLogged] = useState<boolean>(false);


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
                    setCurrentUser({ ...currentUser, fullName: `${res.data.first_name} ${res.data.last_name}` });
                    setISUserLogged(true);
                }
            })
            .catch(err => alert("User not found"));
    }

    const handleLogout = () => {
        axios.post(`http://localhost:4000/logout`)
            .then(res => {
                if (res.status === 200) {
                    setCurrentUser({ fullName: "" });
                    setISUserLogged(true);
                    setISUserLogged(false);
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
            {isUSerLogged ?
                <>
                    <span>{currentUser.fullName}</span><br />

                    {
                        <button onClick={handleLogout}>Logout</button>
                    }
                </>
                : null

            }


        </div>
    );

}