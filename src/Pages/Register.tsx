import axios from "axios";
import React, {  useState } from "react";


export default function Register() {

    

    const [firstName, setFirstName] = useState<string>("");
    const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }

    const [lastName, setLastName] = useState<string>("");
    const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }

    const [username, setUsername] = useState<string>("");
    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const [email, setEmail] = useState<string>("");
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const [password,setPaswoord]=useState<string>("");
    const handleChangePassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPaswoord(e.target.value);
    }

  

    const [registeredEmp, setRegisteredEmp] = useState<{ id: number, fullName: string, username: string, email: string }>();

    const handleRegistration = (event: React.MouseEvent<HTMLButtonElement>) => {
        axios.post(`http://localhost:4000/employee/register`, { firstName: firstName, lastName: lastName, username: username, email: email, password: password})
            .then(res => {
                setRegisteredEmp(res.data);
            })
            .catch(err => alert(err))

        event.preventDefault();

        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');


    }



    return (

        <div className="homePage">
            <form id="registerEmployee">
                <label>First name</label><br />
                <input type="text" value={firstName} onChange={handleChangeFirstName} name='firstName' /><br />
                <label>Last name</label><br />
                <input type="text" value={lastName} onChange={handleChangeLastName} name='lastName' /> <br />
                <label> Username</label><br />
                <input type="text" value={username} onChange={handleChangeUsername} name='username' /><br />
                <label>Email</label><br />
                <input type="text" value={email} onChange={handleChangeEmail} name='email' /><br />
                <label >Password</label><br />
                <input type="text" value={password} onChange={handleChangePassword} name="password"/><br />
                <button onClick={handleRegistration}>Submit data</button><br />
            </form>

            {
                registeredEmp ?

                    <ul>
                        <li>Id: {registeredEmp.id}</li>
                        <li>Full name: {registeredEmp.fullName}</li>
                        <li>Username: {registeredEmp.username}</li>
                        <li>Email: {registeredEmp.email}</li>
                    </ul>
                    : null
            }

        </div>
    );
}