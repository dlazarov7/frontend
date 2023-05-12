import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import Select from 'react-select';


export default function Employees() {

  const [updateAllEmps, setUpdate] = useState<boolean>(true);

  const [allEmps, setAllEmps] = useState<Array<{ id: number, fullName: string, position: string, teamId: number }>>([]);
  useEffect(() => {
   
      axios.get("http://localhost:4000/getAllEmployees")
        .then(res => {
          if (res.status === 200) {
            setAllEmps(res.data);
          }
        })
        .catch(err => alert(err));
    
  }, [updateAllEmps]);


  const [visible, setVisible] = React.useState<boolean>(false);

  const [id, setId] = useState<number>();
  const handleChangeSetId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(e.target.value));
  }

  const [employee, setEmployee] = useState<{ id: number, fullName: string, username: string, position: string, email: string, team: { name: string, department: string, description: string, company: { name: string, country: string } } }>();
  const handleGetEmpById = (event:React.MouseEvent<HTMLButtonElement>) => {
    console.log(id);
    axios.get(`http://localhost:4000/getEmployeeById?id=${id}`)
      .then(res => {
        if (res.status === 200) {
          setEmployee(res.data);
        }
      })
      .catch(err => alert(err));

      event.preventDefault();

      setId(0);
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

  //const [teamId, setTeamId] = useState<number>();
  // const handleChangeTeamId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTeamId(Number(e.target.value));
  // }

  const [updateAllTeams,setUpdateAllTeams]=useState<boolean>(true);

  const [teamsToChoose, setTeamsToChose] = useState<Array<{ id: number, name: string }>>([]);
  useEffect(() => {
    axios.get("http://localhost:4000/getAllTeams")
      .then(res => {
        if (res.status === 200) {
          
          setTeamsToChose(res.data);
        }
      })
      .catch(err => alert(err));


  }, [updateAllTeams]);

  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const handleChangeSelectedTeam = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(e.target.value);
  }

  const team = teamsToChoose?.find(team => team.name === selectedTeam);

  const [position, setPosition] = useState<string>("");
  const handleChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  }

  // const [managerId, setManagerId] = useState<number>();
  // const handleChangeManagerId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setManagerId(Number(e.target.value));
  // }
  
  // const [managers,setManagers]=useState<Array<{id: number, fullName: string, position: string, teamId: number}>>([]);
  // const handleChnageSetManagers=()=>{
    //   setManagers(filteredByPosition);
    // }


    let managers =allEmps.filter(emp => emp.position === "manager" && emp.teamId === team?.id);
    
    const [selectedManager, setSelectedManager] = useState<string>("");
    const handleChangeSelectedManager = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedManager(e.target.value);
    }
    
  const manager = managers.find(manager => manager.fullName === selectedManager);


  const [salary, setSalary] = useState<number>();
  const handleChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(e.target.value));
  }
  const [addedEmp, setAddedEmp] = useState<{ id: number, firstName: string, lastName: string, username: string, email: string, teamId: number, position: string, salary: number, managerId: number }>();

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    axios.post(`http://localhost:4000/employee/add`, { firstName: firstName, lastName: lastName, username: username, email: email, teamId: team?.id, position: position, salary: salary, managerId: manager?.id })
      .then(res => {
        if (res.status === 200) {

          setUpdateAllTeams(!updateAllTeams);
          setUpdate(!updateAllEmps);
          setAddedEmp(res.data);

        }
      })
      .catch(err => alert(err))

    event.preventDefault();

    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    //setTeamsToChose([]);
    setPosition('');
   // managers = [];
    setSalary(0);
    setUpdateAllTeams(true);
    setUpdate(true);
    setSelectedTeam("");

  }


  const [isDeletionSuccessful, setIsDeletrionSuccessful] = useState<string>("");
  const handleEmpDeletionById = (id: number) => {
    axios.delete(`http://localhost:4000/employee/delete`, { data: { id: id } })
      .then(res => {
        if (res.status === 200) {
          let removedEmp = allEmps.filter(emp => emp.id !== id);
          setAllEmps(removedEmp);
          setIsDeletrionSuccessful(res.data);
        }
      })
      .catch(err => alert(err));
  }

  const [idToEdit, setIdToEdit] = useState<number>();
  const handleChangeIdToEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdToEdit(Number(e.target.value));
  }

  const [newFirstName, setNewFirstName] = useState<string>("");
  const handleChangeNewFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFirstName(e.target.value);
  }

  const [newLastName, setNewLastName] = useState<string>("");
  const handleChangeNewLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLastName(e.target.value);
  }

  const [newUsername, setNewUsername] = useState<string>("");
  const handleChangeNewUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  }

  const [newEmail, setNewEmail] = useState<string>("");
  const handleChangeNewEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  }

  // const [newTeamId, setNewTeamId] = useState<number>();
  // const handleChangeNewTeamId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewTeamId(Number(e.target.value));
  // }

  // const [newManagerId, setNewManagerId] = useState<number>();
  // const handleChangeNewManagerId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewManagerId(Number(e.target.value));
  // }

  const [newPosition, setNewPosition] = useState<string>("");
  const handleChangeNewPosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPosition(e.target.value);
  }

  const [newSalary, setNewSalary] = useState<number>();
  const handleChangeNewSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSalary(Number(e.target.value));
  }
  const [editedEmp, setEditedEmp] = useState<{ id: number, firstName: string, lastName: string, username: string, email: string, teamId: number, position: string, salary: number, managerId: number }>();

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    axios.put(`http://localhost:4000/employee/edit`, { id: idToEdit, firstName: newFirstName, lastName: newLastName, username: newUsername, email: newEmail, teamId: team?.id, position: newPosition, salary: newSalary, managerId: manager?.id })
      .then(res => {
        if (res.status === 200) {
          setUpdate(!updateAllEmps);
          setEditedEmp(res.data);

        }

      })
      .catch(err => alert(err));

    event.preventDefault();

    setIdToEdit(0);
    setNewFirstName('');
    setNewLastName('');
    setNewUsername('');
    setNewEmail('');
    //setTeamsToChose([]);
    setNewPosition('');
    //managers = [];
    setNewSalary(0);
    setUpdateAllTeams(true);
    setUpdate(true);
    //setSelectedTeam("");
  }




  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ];

  return (
    <div className='homePage'>
      <span className='heading'>Get all employees</span><br />
      <button onClick={() => setVisible(true)}>Show</button><br />
      <button onClick={() => setVisible(false)}>Hide</button><br />
      {

        visible && allEmps.length ?
          <>
            <h2>Result</h2>
            <ul>
              {
                allEmps.sort((a, b) => {
                  const nameA = a.fullName.toUpperCase();
                  const nameB = b.fullName.toUpperCase();
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }

                  return 0;

                }).map(emp => {
                  return (
                    <>
                      <li key={emp.id}>Id:{emp.id}, Full name: {emp.fullName}</li>
                      <button onClick={() => handleEmpDeletionById(emp.id)}>Delete</button>
                    </>


                  );
                })
              }
            </ul><br />
            <p>
              {isDeletionSuccessful}

            </p>

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
            <ul key={employee.id}>
              <li>Id:{employee.id}</li>
              <li>Full name: {employee.fullName}</li>
              <li>Username: {employee.username}</li>
              <li>Email: {employee.email}</li>
              <li>Position: {employee.position}</li>
              <li>Team name: {employee.team.name}</li>
              <li>Team department: {employee.team.department}</li>
              <li>Team description: {employee.team.description}</li>
              <li>Company name: {employee.team.company.name}</li>
              <li>Company country name: {employee.team.company.country}</li>
            </ul>
          </>
          : null
      }
      <span className='heading'>Add employee</span><br />

      <form id="addEmployee" >
        <label>First name</label><br />
        <input type="text" value={firstName} onChange={handleChangeFirstName} name='firstName' /><br />
        <label>Last name</label><br />
        <input type="text" value={lastName} onChange={handleChangeLastName} name='lastName' /> <br />
        <label> Username</label><br />
        <input type="text" value={username} onChange={handleChangeUsername} name='username' /><br />
        <label>Email</label><br />
        <input type="text" value={email} onChange={handleChangeEmail} name='email' /><br />
        <label >Team</label><br />
        {/* <input type="text" value={teamId} onChange={handleChangeTeamId} name='teamId' /><br /> */}

        {/* <Select className='basic-single' options={teamsToChoose} /><br /> */}
        <select placeholder='Select here' className='basic-single ' onChange={handleChangeSelectedTeam}>
          <option value={selectedTeam} selected disabled hidden>Select here</option>
          {
            teamsToChoose?.map(team => {
              return (<option key={team.id} value={team.name}>{team.name}</option>)
            })
          }
        </select><br />


        <label >Manager</label><br />
        {/* <input type="text" value={managerId} onChange={handleChangeManagerId} name='managerId' /><br /> */}
        <select placeholder='Select here' className='basic-single ' onChange={handleChangeSelectedManager}>
          <option value={selectedManager} selected disabled hidden>Select here</option>
          {
            managers?.map(manager => {
              return (<option key={manager.id} value={manager.fullName}>{manager.fullName}</option>)
            })
          }
        </select><br />
        <label >Position</label><br />
        <input type="text" value={position} onChange={handleChangePosition} name='position' /><br />
        <label >Salary</label><br />
        <input type="text" value={salary} onChange={handleChangeSalary} name='salary' /><br />
        <button onClick={handleAdd}>Add</button><br />
      </form>

      {
        addedEmp ?
          <>
            <h2>Result: Successfuly added an employee</h2>

            <ul key={addedEmp.id}>
              <li>Id: {addedEmp.id}</li>
              <li>Full name: {addedEmp.firstName} {addedEmp.lastName}</li>
              <li>Username: {addedEmp.username}</li>
              <li>Email: {addedEmp.email}</li>
              <li>Team id: {addedEmp.teamId}</li>
              <li>Manager id: {addedEmp.managerId}</li>
              <li>Position: {addedEmp.position}</li>
              <li>Salary: {addedEmp.salary}</li>
            </ul>
          </>

          : null
      }


      {/* <span className='heading'>Delete employee</span><br />
      <label >Enter id</label><br />
      <input type="text" value={idToDelete} onChange={handleChangeIdToDelete} name='idToDelete' /><br />
      <button onClick={handleEmpDeletionById}>Delete</button><br />
      {isDeletionSuccessful ?
        <>
          <p>
            {isDeletionSuccessful}
          </p>
        </>
        : null
      } */}

      <span className='heading'>Edit employee</span><br />
      <label >Id</label><br />
      <input type="text" value={idToEdit} onChange={handleChangeIdToEdit} name='idToEdit' /><br />
      <label>First name</label><br />
      <input type="text" value={newFirstName} onChange={handleChangeNewFirstName} name='newFirstName' /><br />
      <label>Last name</label><br />
      <input type="text" value={newLastName} onChange={handleChangeNewLastName} name='newLastName' /> <br />
      <label> Username</label><br />
      <input type="text" value={newUsername} onChange={handleChangeNewUsername} name='newUsername' /><br />
      <label>Email</label><br />
      <input type="text" value={newEmail} onChange={handleChangeNewEmail} name='newEmail' /><br />
      <label >Team</label><br />
      <select className='basic-single ' name="value" onChange={handleChangeSelectedTeam}>
        <option value="" selected>Choose here</option>
        {
          teamsToChoose?.map(team => {
            return (<option defaultValue="Select Team...">{team.name}</option>)
          })
        }
      </select><br />


      <label >Manager id</label><br />
      {/* <input type="text" value={managerId} onChange={handleChangeManagerId} name='managerId' /><br /> */}
      <select className='basic-single ' name="value" onChange={handleChangeSelectedManager}>
        <option value="" selected>Choose here</option>
        {
          managers?.map(manager => {
            return (<option defaultValue="Select Manager...">{manager.fullName}</option>)
          })
        }
      </select><br />
      <label >Position</label><br />
      <input type="text" value={newPosition} onChange={handleChangeNewPosition} name='newPosition' /><br />
      <label >Salary</label><br />
      <input type="text" value={newSalary} onChange={handleChangeNewSalary} name='newSalary' /><br />
      <button onClick={handleEdit}>Edit</button><br />
      {
        editedEmp ?
          <>
            <h2>Result: Successfuly edited an employee</h2>

            <ul key={editedEmp.id}>
              <li>Id: {editedEmp.id}</li>
              <li>Full name: {editedEmp.firstName} {editedEmp.lastName}</li>
              <li>Username: {editedEmp.username}</li>
              <li>Email: {editedEmp.email}</li>
              <li>Team id: {editedEmp.teamId}</li>
              <li>Manager id: {editedEmp.managerId}</li>
              <li>Position: {editedEmp.position}</li>
              <li>Salary: {editedEmp.salary}</li>
            </ul>
          </>
          : null
      }

    </div>
  );
}