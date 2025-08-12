import './index.css';
import NavBar from '../NavBar';
import { useNavigate } from 'react-router-dom';
 const HomePage = () => {
    
    const navigate = useNavigate();
    
    const gotojobPage = () => {
        navigate('/jobs');
    }
    
    return(
        <>
            <NavBar />
            <div className='home-content'>
                    <div className='entire-content'>
                        <h1>Find The Job That<br></br> Fits Your Life</h1>
                        <p>Millions of people are searching for jobs, salary<br></br> information, company reviews, and interview questions. Find the job that fits your<br></br> abilities and potential.</p>
                        <button onClick={gotojobPage} className='find-jobs-button'>Find Jobs</button>
                    </div>
                </div>
        </>
            )
 }

export default HomePage;