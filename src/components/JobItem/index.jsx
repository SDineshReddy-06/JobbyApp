import './index.css'
import { IoLocationSharp } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";


const JobItem = props => {
    const {jobData} = props
    const {title,logo,location,employmentType,packagePerAnnum,rating,description} = jobData
    return(
        <div className='job-item'>
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
                        <IoLocationSharp />
                        <p>{location}</p>
                    </div>
                    <div className='employment-type'>
                        <FaBriefcase />
                        <p>{employmentType}</p>
                    </div>
                </div>
                <div className='package'>
                    <span>{packagePerAnnum}</span>
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