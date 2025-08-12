import './index.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import NavBar from '../NavBar';
import { useNavigate } from 'react-router-dom';



const EachJobPage = () => {
    const {id} = useParams();
    const [jobData, setData] = useState({});
    const [skills, setSkills] = useState([]);
    const [similarJobs, setSimilarJobs] = useState([]);

    const navigate = useNavigate()

    const goToSimJob = id =>{
        navigate(`/jobs/${id}`)
    } 


    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchJobDetails = async () => {
            const url = `https://apis.ccbp.in/jobs/${id}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`,
                },
            };
            const response = await fetch(url, options);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const jobData = {
                    companyLogoUrl: data.job_details.company_logo_url,
                    comapnyWebsiteUrl: data.job_details.company_website_url,
                    employmentType: data.job_details.employment_type,
                    lifeAtCompanyDes: data.job_details.life_at_company.description,
                    lifeAtCompanyImg: data.job_details.life_at_company.image_url,
                    location: data.job_details.location,    
                    packagePerAnnum: data.job_details.package_per_annum,
                    rating: data.job_details.rating,    
                    title: data.job_details.title,
                    skills: data.job_details.skills,
                    similarJobs: data.similar_jobs,
                    description: data.job_details.job_description,
                }
                const skills = data.job_details.skills.map(skill => ({
                    name: skill.name,
                    imageUrl: skill.image_url,
                }))
                const similarJobs = data.similar_jobs.map(job => ({
                    id: job.id,
                    simJobImgUrl: job.company_logo_url,
                    simJobTitle: job.title,
                    simJobLocation: job.location,
                    simJobEmploymentType: job.employment_type,
                    simJobRating: job.rating,
                    simJobDescription: job.job_description,
                }))
                setData(jobData);
                setSkills(skills);
                setSimilarJobs(similarJobs);
            } else {
                console.error('Failed to fetch job details');
            }
        }
        fetchJobDetails()
    },[id])
    
    return(
        <>
            <NavBar />
            <div className="job-card">
            
                <div className="header">
                    <div className='logo-title'>
                        <img src={jobData.companyLogoUrl} alt="Company Logo" className="company-logo" />
                        <div className="rating">
                            <h2>{jobData.title}</h2>
                            <p>⭐ {jobData.rating}</p>
                    </div>
                    </div>
                    <div className="location-type">
                        <span>📍 {jobData.location}</span>
                        <span>💼 {jobData.employmentType}</span>
                    </div>
                    <div className='salary-visit'>
                        <h3 className="salary">{jobData.packagePerAnnum}</h3>
                        <a href={jobData.comapnyWebsiteUrl} className="visit">Visit ⇗</a>
                    </div>
                </div>
                
                <hr></hr>

                <div className="section">
                    <div>
                        <h3>Description</h3>
                        <p>
                        {jobData.description}
                        </p>
                    </div>
                </div>
                
                <div className="section">
                    <h3>Skills</h3>
                    <div className="skills">
                        {skills.map(skill => (
                            <div className="skill" key={skill.name}>
                                <img src={skill.imageUrl} alt={skill.name} />
                                <span>{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section life">
                    <h3>Life at Company</h3>
                    <div className="life-content">
                    <p>{jobData.lifeAtCompanyDes}</p>
                    <img src={jobData.lifeAtCompanyImg} alt="Office Environment" />
                    </div>
                </div>


            </div>
            <div className="similar-jobs">
                <h2>Similar Jobs</h2>
                <div className='similar-jobs-list'>
                    {similarJobs.map(job => (
                        <div key={job.id} className="similar-job-item" onClick={() => goToSimJob(job.id)}>
                            <img src={job.simJobImgUrl} alt={job.simJobTitle} className="similar-job-logo" />
                            <div className="similar-job-details">
                                <h3>{job.simJobTitle}</h3>
                                <p>{job.simJobLocation}</p>
                                <p>{job.simJobEmploymentType}</p>
                                <p>⭐ {job.simJobRating}</p>
                                <p>{job.simJobDescription}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
        
    )

}

export default EachJobPage;