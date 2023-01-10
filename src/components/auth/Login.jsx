import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import '.././../styles/authpassword.scss'

import { Spin } from 'antd'
import { LoginOutlined, EyeOutlined,
    EyeInvisibleOutlined, LoadingOutlined
} from '@ant-design/icons'
import { errorNotification, successNotification } from '../../antd/Notification'
import { decodeJwt, redirectToUserPage } from '../../tokenDecoder'


const Login = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    
    const fPwdRef = useRef()
    const { auth, setAuth }  = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/"

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[iconVisible, setIconVisibility] = useState(false)
    const[isLoading, setIsLoading] = useState(false)

    const getEmail = (e) => setEmail(e.target.value)
    const getPassword = (e) => setPassword(e.target.value)
    const changeVisibility = () => setIconVisibility(!iconVisible)

    const iconVisibilityToggle = iconVisible ? <EyeOutlined /> :  <EyeInvisibleOutlined /> 

    const loginPostUrl = "/auth/signin"
    const sendLoginDetails = (e) => {
        e.preventDefault()
        if(email.length === 0) 
            errorNotification("Email Required!", "Input email", 'topRight')
        else if(password.length === 0) 
            errorNotification("Password Required!", "Input password", 'topRight')
        else {
            setIsLoading(true)
            axios.post(loginPostUrl, {
                email: email,
                password: password
            }).then(res => {
                const response = res.data
                successNotification(response.message, '', 'bottomRight')
                const jwtInfo = decodeJwt(response.data)   
                setAuth({token: response.token, roles: jwtInfo.roles, username: jwtInfo.sub})
                redirectToUserPage(location, navigate, jwtInfo.roles)
                navigate(from, { replace: true })
                console.log(`requireAuth: ${auth?.username}`)
                setIsLoading(false)
            }).catch(err => {
                setAuth(false)
                setIsLoading(false)
                console.log(err)
                if(err.response.status === 400)
                    errorNotification("Not allowed", err.response.data.errorMessage, "topRight")
                else if(err.response.status === 401)
                    errorNotification("Invalid Credentials", err.response.data.errorMessage, "topRight")
                else errorNotification("SERVER ERROR", err.response.data.errorMessage, "topRight")
            })
        }
    }

    useEffect(() => {
        fPwdRef.current.tabIndex = -2
    }, [])

  return (
    <section className="login-section" >
        <form className="container" onSubmit={sendLoginDetails}>
            <div className="icon"> <LoginOutlined /></div>
            <h2>Sign in</h2>
            <p style={{marginTop: "-20px"}}> Access your account.</p>

            <div className="input">
                <label htmlFor="email-input" className="mini-head">Email</label>
                <input id="email-input" value={email} className="form-input" type="email" 
                onChange={getEmail}
                placeholder="Email"/>
            </div>

            <div className="input">
                <Link to="/auth/forgot-password" id="forgot-password" ref={ fPwdRef }>Forgot Password? </Link>
                <label htmlFor="password-login" className="mini-head">Password</label>
                <input id="password-login" className="form-input" value={password}
                    type={ iconVisible ? "text" : "password"} 
                    placeholder="Password"
                    onChange={getPassword}
                />
                <div id="icon-see1" onClick={ changeVisibility }>
                    { iconVisibilityToggle }
                </div>
            </div>

            { isLoading ?  
               <Spin indicator={antIcon} /> : 
                <button className="btn btn-large">Sign in</button>
             }
            <div className="login-link-div">
                <p style={{textAlign: "center"}}>No account yet? <Link to="/auth/signup" className='link'>Sign up</Link></p>
            </div>
        </form>
    </section>
  )
}

export default Login