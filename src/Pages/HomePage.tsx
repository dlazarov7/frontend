import axios from 'axios';
import React, { useState } from 'react';

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

    return (
        <div className='homePage'>
            <span className='heading'>Filter employees by country and years in the company</span>
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
                                <><li>{emp.fullName}</li>
                                    <br /></>
                            );
                        })}

                    </ul>
                </>
                : null}
        </div>
    );
}