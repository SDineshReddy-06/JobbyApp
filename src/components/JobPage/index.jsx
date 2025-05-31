import './index.css';
import NavBar from '../NavBar';
import JobItem from '../JobItem';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';






const JobPage = () => {
    const [JobsList, setJobsList] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const search = () => {
        const filteredJobs = JobsList.filter(job => 
            job.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        setJobsList(filteredJobs);
        setSearchInput('');
    }
   
useEffect(() => {
     const jobsItemView = async () => {
        const url = 'https://apis.ccbp.in/jobs'
        const jwtToken = Cookies.get('jwt_token')
        const Options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        }
        const response = await fetch(url, Options);
        const data = await response.json();
        const formattedData = data.jobs.map(job => ({
                title: job.title,
                logo: job.company_logo_url,   
                location: job.location,   
                employmentType: job.employment_type,
                packagePerAnnum: job.package_per_annum, 
                id: job.id,
                rating: job.rating,     
                description: job.job_description,
            }))
        setJobsList(formattedData);
        
    }
    jobsItemView();
},[])

    return(
        <>
            <NavBar/>
            <div className='job-content'>
                <div className='side-bar'>
                    <div className='profile'>
                        <img className='profile-pic'  src='https://assets.ccbp.in/frontend/react-js/male-avatar-img.png'></img>
                        <h3>Name</h3>
                        <p>Lead Software Developer and AI-ML expert</p>
                    </div>
                    <hr></hr>
                    <div className="employment-box">
                        <h4>Type of Employment</h4>

                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Full Time</span>
                        </label>

                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Part Time</span>
                        </label>

                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Freelance</span>
                        </label>

                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Internship</span>
                        </label>
                    </div>
                    <hr></hr>
                    <div className="salary-box">
                        <h4>Salary Range</h4>

                        <label className="radio-label">
                        <input type="radio" name="salary" />
                        <span>10 LPA and above</span>
                        </label>

                        <label className="radio-label">
                        <input type="radio" name="salary" />
                        <span>20 LPA and above</span>
                        </label>

                        <label className="radio-label">
                        <input type="radio" name="salary" />
                        <span>30 LPA and above</span>
                        </label>

                        <label className="radio-label">
                        <input type="radio" name="salary" />
                        <span>40 LPA and above</span>
                        </label>
                    </div>
                </div>
                <div className='job-item-part'>
                    <div className='searchbar'>
                        <input placeholder='Search' onChange={event => setSearchInput(event.target.value)} type='search'></input>
                        <button onClick={search}>Search</button>
                    </div>
                    <div className='job-list'>
                        <ul>
                            {JobsList.map(job => (
                                <JobItem jobData={job} key={job.id} />
                            ))}
                        </ul>
                    </div>
            </div>
            </div>
          
        </>
    )
}

export default JobPage;