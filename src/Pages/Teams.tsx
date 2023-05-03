import axios from "axios";
import React, { useState } from "react";

export default function Teams() {

  const [teamName, setTeamName] = useState<string>("");
  const handleChangeTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  }

  const [teamInfo, setTeamInfo] = useState<Array<{ id: number, managerId: number, fullName: string, email: string, team: { description: string } }>>([]);

  const handleTeamInfo = () => {
    axios.get(`http://localhost:4000/team/info?name=${teamName}`)
      .then(res => {
        if (res.status === 200) {
          setTeamInfo(res.data);
        }
      })
      .catch(err => alert(err));
  }

  const [depName, setDepName] = useState<string>("");
  const handleChangeDepName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepName(e.target.value);
  }

  const [depAvg,setDepAvg]=useState<{department:string, avgSalary:number}>()

  const handleDepAvgSalary = () => {
    axios.get(`http://localhost:4000/department/avg/salary?depName=${depName}`)
      .then(res => {
        if (res.status === 200) {
          setDepAvg(res.data);
        }
      })
      .catch(err=>alert(err));
  }


  return (
    <div className="homePage">
      <span className='heading'>Team info</span><br />
      <label >Enter team name</label><br />
      <input type="text" value={teamName} onChange={handleChangeTeamName} name="teamName" /><br />
      <button onClick={handleTeamInfo}>Enter</button><br />
      {
        teamInfo ?
          <>
            {teamInfo.map((emp, index = 1) => {
              { index++ }

              return (

                <>
                  <h2>Teammate {index}</h2>
                  <ul>
                    <li>Id: {emp.id} </li>
                    <li>Full name: {emp.fullName}</li>
                    <li> Email: {emp.email}</li>
                    <li>Manager id: {emp.managerId}</li>
                    <li>Team description: {emp.team.description}</li>
                  </ul>
                </>
              );
            })}
          </>
          : null
      }

      <span className='heading'>Get avarage salary by department</span><br />
      <label >Enter team name</label><br />
      <input type="text" value={depName } onChange={ handleChangeDepName} name="depName" /><br />
      <button onClick={ handleDepAvgSalary }>Enter</button><br />

      <>
      {
        depAvg?
        <ul>
          <li>Department: {depAvg.department}</li>
          <li>Avarage salary:{depAvg.avgSalary.toFixed(2)}</li>
        </ul>
        :null
      }
      </>


    </div>
  );
}