import './index.css'
import { useNavigate } from 'react-router-dom';


const JobItem = props => {
    const {jobData} = props
    const {title,logo,location,employmentType,packagePerAnnum,rating,description} = jobData
    const navigate = useNavigate();
    const jobSelected = () => {
        navigate(`/jobs/${jobData.id}`)
    }

    return(
        <div className='job-item' onClick={jobSelected}>
            <div className='logo-part'>
                <img src={logo}></img>
                <div className='name-rate'>
                    <h3>{title}</h3>
                    <div className='rating'>
                        <p>⭐{rating}</p>
                    </div>
                    
                </div>
            </div>
            <div className='loc-pack'>
                <div className='loc-emp'>
                    <div className='location'>
                        {/* <IoLocationSharp /> */}
                        <span>{location}</span>
                    </div>
                    <div className='employment-type'>
                        {/* <FaBriefcase /> */}
                        <span>{employmentType}</span>
                    </div>
                    <div className='package'>
                        <span>{packagePerAnnum}</span>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className='description'>
                <h4>Description</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default JobItem