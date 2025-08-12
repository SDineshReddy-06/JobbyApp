
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router'



import './index.css'
    
    
    const NavBar = () => {
        const navigate = useNavigate();

    const gotoHome = () => {
        navigate('/');
    };


    const gotoJob = () => {
        navigate('/jobs');
    };
    
    const onClickLogout = () => {
        Cookies.remove('jwt_token')
        navigate('/login', {replace: true})
    }
    
    return(

        <div className='entire-home-page'>
            <div className='navbar'>
                <div>
                    <img onClick={gotoHome} className='nav-logo' src='https://assets.ccbp.in/frontend/react-js/logo-img.png'>
                    </img>
                </div>
                
                    <div className='nav-links'>
                        <a onClick={gotoHome}>Home</a>
                        <a onClick={gotoJob}>Jobs</a>
                    </div>
                
                <div className='btn-container'>
                    <button onClick={onClickLogout} className='logout-button'>Logout</button>
                </div>
            </div>

        </div>
    )
}
export default NavBar