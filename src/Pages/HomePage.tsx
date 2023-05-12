import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [country, setCountry] = useState<string>("");
    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(e.target.value);
    }

    const [years, setYears] = useState<number>();
    const handleChangeYears = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYears(Number(e.target.value));
    }

    const [filteredEmps, setFilteredEmps] = useState<Array<{ fullName: string }>>([])

    const handleFIlter = () => {
        axios.get(`http://localhost:4000/filter/employees?country=${country}&years=${years}`)
            .then(res => {
                if (res.status === 200) {
                    setFilteredEmps(res.data);
                }
            })
            .catch(err => alert(err));
    }

    const [avgSalaries, setAvgSalaries] = useState<Array<{ avgSalary: number, department: string }>>([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/avg/salary`)
            .then(res => {
                if (res.status === 200) {
                    setAvgSalaries(res.data);
                }
            })
            .catch(err => alert(err));
    }, []);

    const [companyName, setCompanyName] = useState<string>("");
    const handleChangeCompanyName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(e.target.value);
    }

    const [empExpInCompany, setEmpExtInCompany] = useState<Array<{ fullName: string }>>();
    const handleEmpExpInCompany = (event:React.MouseEvent<HTMLButtonElement>) => {
        axios.get(`http://localhost:4000/employees/company?name=${companyName}`)
            .then(res => {
                if (res.status === 200) {
                    setEmpExtInCompany(res.data);
                }
            })
            .catch(err => alert(err));

            event.preventDefault()
            setCompanyName('');
    }

    return (
        <div className='homePage'>
            <span className='heading'>Filter employees by country and years in the company</span><br />
            <label>Country</label><br />
            <input type="text" value={country} onChange={handleChangeCountry} name='country' /><br />
            <label>Years</label> <br />
            <input type="text" value={years} onChange={handleChangeYears} name='years' /> <br />
            <button onClick={handleFIlter}>Filter</button><br />
            {filteredEmps.length ?
                <>
                    <h2>Result</h2>
                    <ul>

                        {filteredEmps.map(emp => {
                            return (
                                <>
                                    <li>{emp.fullName}</li>
                                </>
                            );
                        })}

                    </ul>
                </>
                : null}
            <>

                <h2>This are the avarage salaries for all the teams</h2>
                {
                    avgSalaries ?
                        avgSalaries.map(salary => {
                            return (
                                <ul>
                                    <li>{salary.department}: {salary.avgSalary.toFixed(2)}</li>
                                </ul>
                            );
                        })
                        : null
                }

            </>

            <span className='heading'>Get all the employees with atleast 6 months experiance by given company</span><br />
            <label>Enter company name</label><br />
            <input type="text" value={companyName} onChange={handleChangeCompanyName} name='companyName' /><br />
            <button onClick={handleEmpExpInCompany}>Enter</button>

            <>
                {
                    empExpInCompany ?
                        empExpInCompany.map(emp => {
                            return (
                                <ul>
                                    <li>{emp.fullName}</li>
                                </ul>
                            );
                        })
                        : null
                }
            </>


        </div>
    );
}