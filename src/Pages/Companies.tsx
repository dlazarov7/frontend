import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Companies() {
  const [allCompnaies, setAllCompanies] = useState<Array<{ id: number, name: string, country: string }>>();
  const handleAllCompanies = () => {
    axios.get(`http://localhost:4000/allCompanies`)
      .then(res => {
        if (res.status === 200) {
          setAllCompanies(res.data);
        }
      })
      .catch(err => alert(err));
  }

  return (
    <div className='homePage'>
      <span className='heading'>Get all companies</span><br />
      <button onClick={handleAllCompanies}>Get</button><br />

      <>
      
      {
        allCompnaies?
        allCompnaies.map(company=>{
          <h2>Result</h2>
          return(
            <ul>
            <li>Id: {company.id}</li>
            <li>Name: {company.name}</li>
            <li>Country: {company.country}</li>
          </ul>
        );
        })
        :null
      }
      </>



      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}