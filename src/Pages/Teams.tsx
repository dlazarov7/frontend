import axios from "axios";
import React, { useState, useContext } from "react";
import AuthContext from "../Contex/AuthContext";

export default function Teams() {

  const isLoged = useContext(AuthContext);
  console.log(isLoged);
  const [teamName, setTeamName] = useState<string>("");
  const handleChangeTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  }

  const [teamInfo, setTeamInfo] = useState<Array<{ id: number, managerId: number, fullName: string, email: string, team: { name: string, description: string } }>>([]);

  const handleTeamInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    axios.get(`http://localhost:4000/team/info?name=${teamName}`)
      .then(res => {
        if (res.status === 200) {
          setTeamInfo(res.data);
        }
      })
      .catch(err => alert(err));

    event.preventDefault();

    setTeamName("");
  }

  const [depName, setDepName] = useState<string>("");
  const handleChangeDepName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepName(e.target.value);
  }

  const [depAvg, setDepAvg] = useState<{ department: string, avgSalary: number }>()

  const handleDepAvgSalary = (event: React.MouseEvent<HTMLButtonElement>) => {
    axios.get(`http://localhost:4000/department/avg/salary?depName=${depName}`)
      .then(res => {
        if (res.status === 200) {
          setDepAvg(res.data);
        }
      })
      .catch(err => alert(err));

    event.preventDefault();

    setDepName("");
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
            {/* <h2>Teammates </h2>  */}
            {
              teamInfo.map(emp => {


                return (
                  <>
                    <ul>
                      <li>Id: {emp.id} </li>
                      <li>Full name: {emp.fullName}</li>
                      <li> Email: {emp.email}</li>
                      <li>Manager id: {emp.managerId}</li>
                      <li>Team description: {emp.team.description}</li>
                    </ul>
                  </>
                );
              })};
          </>
          : null
      }

      <span className='heading'>Get avarage salary by department</span><br />
      <label >Enter department name</label><br />
      <input type="text" value={depName} onChange={handleChangeDepName} name="depName" /><br />
      <button onClick={handleDepAvgSalary}>Enter</button><br />

      <>
        {
          depAvg ?
            <ul>
              <li>Department: {depAvg.department}</li>
              <li>Avarage salary:{depAvg.avgSalary.toFixed(2)}</li>
            </ul>
            : null
        }
      </>


    </div>
  );
}