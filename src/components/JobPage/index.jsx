import './index.css';
import NavBar from '../NavBar';
import JobItem from '../JobItem';
import Cookies from 'js-cookie';
import { use, useState } from 'react';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';



const JobPage = () => {
    const [fullList, setFullList] = useState([])
    const [JobsList, setJobsList] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState({})
    const [jobType, setJobType] = useState([]);
    const [salaryRange,setSalaryRange] = useState('')

    function handleJobType(event){
        if(event.target.checked){
            setJobType([...jobType,event.target.value]);
        }
        else{
            let newJobType = jobType.filter((eachType) => {
                return event.target.value != eachType;
            })
            setJobType(newJobType)
        }
        
    }

    function handleSalaryChange(event){
        if(event.target.value == salaryRange){
            setSalaryRange('');
        }
        else{
            setSalaryRange(event.target.value);
        }
        console.log(salaryRange)
    }

    function buildUrl(){

        let baseUrl = "https://apis.ccbp.in/jobs"; 
        let queryParams = [];

        if(jobType.length > 0){
            let jobsTypeCombined = jobType.join(",");
            queryParams.push(`employment_type=${jobsTypeCombined}`);
        }

        if(salaryRange != ''){
            queryParams.push(`minimum_package=${salaryRange}`);
        }

        const queryString = queryParams.length > 0 ? queryParams.join("&") : '';

        return baseUrl +"?" +queryString;
    }

    function resetFilters(){
        setJobType([]);
        setSalaryRange('');
    }

    useEffect(() => {
        const profileDetails = async () => {
            const url = 'https://apis.ccbp.in/profile'
            const jwtToken = Cookies.get('jwt_token')
            const Options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
            const response = await fetch(url, Options);
            if (response.ok) {
                const data = await response.json();
                const profileData = {
                    name: data.profile_details.name,
                    profileImageUrl: data.profile_details.profile_image_url,
                    shortBio: data.profile_details.short_bio,
                };
                setProfileData(profileData);
            } else {
                console.error('Failed to fetch profile details');
            }
        }
        profileDetails();
    },[])
     
    const search = () => {
        if (searchInput === '') {
            setJobsList(fullList);
        }
        else{
            let filteredJobs = JobsList.filter(job => 
                job.title.toLowerCase().includes(searchInput.toLowerCase())
            );
             filteredJobs = JobsList.filter(job => 
                job.location.toLowerCase().includes(searchInput.toLowerCase())
            );
            setJobsList(filteredJobs);
        }
        setSearchInput('');
    }
 
    const SearchChange = (event) => {
        const value = event.target.value;
        setSearchInput(value);
        if (value === '') {
            setJobsList(fullList);
        }
    }
   
    useEffect(() => {
     const jobsItemView = async () => {
        const url = buildUrl();
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
            setFullList(formattedData);
        setJobsList(formattedData);
        setIsLoading(false);
        
    }
    jobsItemView();
    },[jobType,salaryRange])

    const listOrNot = () => {
        if (JobsList.length === 0) {
            return <div className='no-jobs'><img className='not-found-img' src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'></img></div>
        }
        else{
            return(
                <div className='job-list'>
                        <ul>
                            {JobsList.map(job => (
                                <JobItem jobData={job} key={job.id} />
                            ))}
                        </ul>
                    </div>
            )
        }
        
    }
    
    return(
        <>
            <NavBar/>
            <div className='job-content'>
                <div className='side-bar'>
                    <div className='profile'>
                        <img className='profile-pic'  src={profileData.profileImageUrl}/>
                        <h3>{profileData.name}</h3>
                        <p>{profileData.shortBio}</p>
                    </div>
                    <hr></hr>
                    <div className="employment-box">
                        <h4>Type of Employment</h4>

                        <label className="checkbox-label">
                            <input type="checkbox" value={"FULLTIME"} onChange={handleJobType}/>
                            <span>Full Time</span>
                        </label>

                        <label className="checkbox-label">
                            <input type="checkbox" value={"PARTTIME"} onChange={handleJobType}/>
                            <span>Part Time</span>
                        </label>

                        <label className="checkbox-label">
                            <input type="checkbox" value={"FREELANCE"} onChange={handleJobType}/>
                            <span>Freelance</span>
                        </label>

                        <label className="checkbox-label">
                            <input type="checkbox" value={"INTERNSHIP"} onChange={handleJobType}/>
                            <span>Internship</span>
                        </label>
                    </div>
                    <hr></hr>
                    <div className="salary-box">
                        <h4>Salary Range</h4>

                        <label className="radio-label">
                            <input type="radio" name="salary" value={"1000000"} checked={salaryRange === "1000000"} onChange={handleSalaryChange}/>
                            <span>10 LPA and above</span>
                        </label>

                        <label className="radio-label">
                            <input type="radio" name="salary" value={"2000000"} checked={salaryRange === "2000000"} onChange={handleSalaryChange}/>
                            <span>20 LPA and above</span>
                        </label>

                        <label className="radio-label">
                            <input type="radio" name="salary" value={"3000000"} checked={salaryRange === "3000000"} onChange={handleSalaryChange}/>
                            <span>30 LPA and above</span>
                        </label>

                        <label className="radio-label">
                            <input type="radio" name="salary" value={"4000000"} checked={salaryRange === "4000000"} onChange={handleSalaryChange}/>
                            <span>40 LPA and above</span>
                        </label>

                        <button onClick={resetFilters}>Reset</button>
                    </div>
                </div>
                <div className='job-item-part'>
                    <div className='searchbar'>
                        <input className='search-bar' placeholder='Search By Job or location...' onChange={SearchChange} type='search'></input>
                        <button className='search-buton' onClick={search}>🔍</button>
                    </div>
                    <div className='job-list'>
                        {isLoading ? (
                        <div className="loading"><ThreeDots height="20" width="20" color="#ffffff"/></div>
                    ) : (
                        listOrNot()
                    )}
                    </div>
                </div>
            </div>
          
        </>
    )
}

export default JobPage;

