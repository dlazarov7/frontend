import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function Companies() {

  const [updateAllCompanies, setUpdate] = useState<boolean>(true);


  const [allCompnaies, setAllCompanies] = useState<Array<{ id: number, name: string, country: string }>>([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/allCompanies`)
      .then(res => {
        if (res.status === 200) {
          setAllCompanies(res.data);
        }
      })
      .catch(err => alert(err));
  }, [updateAllCompanies])

  const [visible, setVisible] = React.useState<boolean>(false);


  const [id, setId] = useState<number>();
  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(e.target.value));
  }

  const [company, setCompany] = useState<{ id: number, name: string, country: string }>();

  const handleGetCompanyById = () => {
    axios.get(`http://localhost:4000/getCompanyById?id=${id}`)
      .then(res => {
        if (res.status === 200) {
          setCompany(res.data);
        }
      })
      .catch(err => alert(err));
  }

  const [name, setName] = useState<string>("");
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const [country, setCountry] = useState<string>("");
  const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  }

  const [addedCompany, setAddedCompany] = useState<{ id: number, name: string, country: string }>();


  const handleAddCompany = (event: React.MouseEvent<HTMLButtonElement>) => {
    axios.post(`http://localhost:4000/company/add`, { name: name, country: country })
      .then(res => {
        if (res.status === 200) {
          setUpdate(!updateAllCompanies)
          setAddedCompany(res.data);
        }
      })
      .catch(err => alert(err));

    event.preventDefault();

    setName("");
    setCountry("");
    setUpdate(true);
  }


  const [isDeletionSuccessful, setIsDeletrionSuccessful] = useState<string>("");

  const handleDeletion = (id: number) => {
    axios.delete(`http://localhost:4000/company/delete`, { data: { id: id } })
      .then(res => {
        if (res.status === 200) {
          let removedCompany = allCompnaies.filter(c => c.id !== id);
          setAllCompanies(removedCompany);
          setIsDeletrionSuccessful(res.data);
        }
      })
      .catch(err => alert(err));
  }

  const [companyIdToEdit,setCompanyIdToEdit]=useState<number>();
  const handleChangeCompanyIdToEdit=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setCompanyIdToEdit(Number(e.target.value));
  }

  const [newName, setNewName] = useState<string>("");
  const handleChangeNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  }

  const [newCountry, setNewCountry] = useState<string>("");
  const handleChangeNewCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCountry(e.target.value);
  }

  const [editedCompany,setEDitedeCompany]=useState<{id:number,name:string,country:string}>();

  const handleCompanyEdit=(event: React.MouseEvent<HTMLButtonElement>)=>{
    axios.put(`http://localhost:4000/company/edit`, {id:companyIdToEdit ,name: newName, country: newCountry })
    .then(res => {
      if (res.status === 200) {
        setUpdate(!updateAllCompanies)
        setEDitedeCompany(res.data);
      }
    })
    .catch(err => alert(err));

    event.preventDefault();

    setCompanyIdToEdit(0);
    setNewName("");
    setNewCountry("");
    setUpdate(true);
  }
  

  return (
    <div className='homePage'>
      <span className='heading'>Get all companies</span><br />
      <button onClick={() => setVisible(true)}>Show</button><br />
      <button onClick={() => setVisible(false)}>Hide</button><br />
      {/* <button onClick={handleAllCompanies}>Get</button><br /> */}

      {

        visible && allCompnaies.length ?
          <>
            <h2>Result</h2>
            <ul>
              {
                allCompnaies.sort((a, b) => {
                  const nameA = a.name.toUpperCase();
                  const nameB = b.name.toUpperCase();
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }

                  return 0;

                }).map(company => {
                  return (
                    <>
                      <li key={company.id}>Id:{company.id}, Name: {company.name}</li>
                      <button onClick={() => handleDeletion(company.id)}>Delete</button>
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

      <span className='heading'>Get company by id</span><br />
      <label>Id</label><br />
      <input type="text" value={id} onChange={handleChangeId} name='id' /><br />
      <button onClick={handleGetCompanyById}>Get</button><br />
      {
        company ?
          <ul>
            <li>Id: {company.id}</li>
            <li>Name: {company.name}</li>
            <li>Country: {company.country}</li>
          </ul>
          : null
      }

      <span className='heading'>Add company </span><br />
      <form id='addCompany'>
        <label >Company name</label><br />
        <input type="text" value={name} onChange={handleChangeName} name='name' /><br />
        <label >Counry</label><br />
        <input type="text" value={country} onChange={handleChangeCountry} name='country' /><br />
        <button onClick={handleAddCompany}>Add</button>
      </form>

      {
        addedCompany ?

          <ul>
            <li>Id: {addedCompany.id}</li>
            <li>Name: {addedCompany.name}</li>
            <li>Country: {addedCompany.country}</li>
          </ul>

          : null
      }


<span className='heading'>Edit company </span><br />
      <form id='editCompany'>
        <label >Id</label><br />
        <input type="text" value={companyIdToEdit} onChange={handleChangeCompanyIdToEdit} name='companyIdToEdit' /><br />
        <label >Company new name</label><br />
        <input type="text" value={newName} onChange={handleChangeNewName} name='newName' /><br />
        <label > Counry</label><br />
        <input type="text" value={newCountry} onChange={handleChangeNewCountry} name='newCountry' /><br />
        <button onClick={handleCompanyEdit}>edit</button>
      </form>

      {
        editedCompany ?

          <ul>
            <li>Id: {editedCompany.id}</li>
            <li>Name: {editedCompany.name}</li>
            <li>Country: {editedCompany.country}</li>
          </ul>

          : null
      }

      <p><Link to="/">Go to the home page</Link></p>
    </div>
  );
}