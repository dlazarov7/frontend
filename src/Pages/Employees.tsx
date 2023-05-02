import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';


export default function Employees() {
  const [allEmps, setAllEmps] = useState<Array<{ id: number, fullName: string }>>([])
  const handleGetAll = () => {
    axios.get("http://localhost:4000/getAllEmployees")
      .then(res => {
        if (res.status === 200) {
          setAllEmps(res.data);
        }
      })
      .catch(err => alert(err));
  }

  const [id, setId] = useState<number>();
  const handleChangeSetId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(e.target.value));
  }

  const [employee, setEmployee] = useState<{ id: number, fullName: string, username: string, email: string, team: { name: string, department: string, description: string, company: { name: string, country: string } } }>()
  const handleGetEmpById = () => {
    console.log(id);
    axios.get(`http://localhost:4000/getEmployeeById?id=${id}`)
      .then(res => {
        if (res.status === 200) {
          setEmployee(res.data);
        }
      })
      .catch(err => alert(err));
  }

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

  const [teamId, setTeamId] = useState<number>();
  const handleChangeTeamId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamId(Number(e.target.value));
  }

  const [position, setPosition] = useState<string>();
  const handleChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  }

  const [managerId, setManagerId] = useState<number>();
  const handleChangeManagerId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManagerId(Number(e.target.value));
  }

  const [salary, setSalary] = useState<number>();
  const handleChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(e.target.value));
  }
  const [addedEmp, setAddedEmp] = useState<{id:number, firstName: string, lastName: string, username: string, email: string, teamId: number, position: string, salary: number, managerId: number }>()

  const handleAdd = () => {
    axios.post(`http://localhost:4000/employee/add`, { firstName: firstName, lastName: lastName, username: username, email: email, teamId: teamId, position: position, salary: salary, managerId: managerId })
      .then(res => {
        if (res.status === 200) {
          setAddedEmp(res.data);
        }
      })
      .catch(err => alert(err));
  }

  return (
    <div className='homePage'>
      <span className='heading'>Get all employees</span><br />
      <button onClick={handleGetAll}>Get all</button><br />
      {
        allEmps.length ?
          <>
            <h2>Result</h2>
            <ul>
              {allEmps.map(emp => {
                return (
                  <>
                    <li>Id:{emp.id}, Full name {emp.fullName}</li><br />
                  </>
                )
              })}
            </ul>
          </>
          : null
      }

      <span className='heading'>Get employee by id</span><br />
      <input type="text" value={id} onChange={handleChangeSetId} name='id' /><br />
      <button onClick={handleGetEmpById}>Get</button><br />
      {
        employee ?
          <>
            <h2>Result</h2>
            <ul>
              <li>Id:{employee.id}</li><br />
              <li>Full name: {employee.fullName}</li><br />
              <li>Username: {employee.username}</li><br />
              <li>Email: {employee.email}</li><br />
              <li>Team name: {employee.team.name}</li><br />
              <li>Team department: {employee.team.department}</li><br />
              <li>Team description: {employee.team.description}</li><br />
              <li>Company name: {employee.team.company.name}</li><br />
              <li>Company country name: {employee.team.company.country}</li><br />
            </ul>
          </>
          : null
      }
      <span className='heading'>Add employee</span><br />
      <label>First name</label><br />
      <input type="text" value={firstName} onChange={handleChangeFirstName} name='firstName' /><br />
      <label>Last name</label><br />
      <input type="text" value={lastName} onChange={handleChangeLastName} name='lastName' /> <br />
      <label> Username</label><br />
      <input type="text" value={username} onChange={handleChangeUsername} name='username' /><br />
      <label>Email</label><br />
      <input type="text" value={email} onChange={handleChangeEmail} name='email' /><br />
      <label >Team id</label><br />
      <input type="text" value={teamId} onChange={handleChangeTeamId} name='teamId' /><br />
      <label >Company id</label><br />
      <input type="text" value={position} onChange={handleChangePosition} name='position' /><br />
      <label >Manager id</label><br />
      <input type="text" value={managerId} onChange={handleChangeManagerId} name='managerId' /><br />
      <label >Salary</label><br />
      <input type="text" value={salary} onChange={handleChangeSalary} name='salary' /><br />
      <button onClick={handleAdd}>Add</button><br />
      {
        addedEmp ?
          <>
            <h2>Result: Successfuly added an employee</h2>

            <ul>
              <li>Id: {addedEmp.id}</li>
              <li>Full name: {addedEmp.firstName} {addedEmp.lastName}</li><br />
              <li>Username: {addedEmp.username}</li><br />
              <li>Email: {addedEmp.email}</li><br />
              <li>Team id: {addedEmp.teamId}</li><br />
              <li>Position: {addedEmp.position}</li><br />
              <li>Manager id: {addedEmp.managerId}</li><br />
              <li>Salary: {addedEmp.salary}</li><br />
            </ul>
          </>
          : null
      }

    </div>
  );
}