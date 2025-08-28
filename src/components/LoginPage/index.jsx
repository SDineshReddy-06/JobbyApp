import {useState} from 'react'
import {useNavigate} from 'react-router'
import Cookies from 'js-cookie'

import './index.css'
const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onChangeUsername = event => {
        setUsername(event.target.value)
    }

    const onChangePassword = event => {
        setPassword(event.target.value)
    }

    const onSubmitForm = async event => {
       event.preventDefault()
       const userDetails = {username, password}
       const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)  
        const data = await response.json()
        if (data.jwt_token != undefined) {
            Cookies.set('jwt_token', data.jwt_token, {expires: 30})
            navigate('/', {replace: true})
        } else {
            alert('Invalid username or password')
            setUsername('')
            setPassword('')
        }
    }
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
        navigate('/login', {replace:true})
    }

    return (
        <div className='entire-login-page'>
            <div className="login-form-container">
          <form className="form-container" onSubmit={onSubmitForm}>
            <h1 className="login-website-logo-mobile-img">CareerHub</h1>
                
                
            <div className="input-container" >
                <p>Username</p>
                <input value={username} onChange={onChangeUsername} placeholder='Username'></input>
            </div>
            <div className="input-container" >
                <p>Password</p>
                <input value={password} onChange={onChangePassword} type='password' placeholder='Password'></input>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            
          </form>
        </div>
        </div>
        
      )
}


export default LoginPage