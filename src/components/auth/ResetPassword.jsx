import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { regex } from '../../reducer/signupReducer'
import { message, Spin } from 'antd';
import { ArrowLeftOutlined, LoadingOutlined, } from '@ant-design/icons'

import '../../styles/authpassword.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const ResetPassword = () => {
    let navigate = useNavigate()
    const goBack = () => navigate(-1)

    const[email, setEmail] = useState('')
    const[errorMsg, setErrorMsg] = useState("Enter a valid email.")
    const[isEmailError, setIsEmailError] = useState(false)
    const[isLoading, setIsLoading] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();

    const getEmail = e => {
        let email = e.target.value
        if(email.length > 0) {
            setIsEmailError(!regex.test(email))
            setEmail(email)
        }
        else setIsEmailError(false)
    }


    const resetPasswordUrl = `/auth/forgot-password`
    const sendEmailToGetResetToken = (e) => {
        e.preventDefault()
        if(!isEmailError) {
            setIsLoading(true)
            axios.post(resetPasswordUrl, {
                email: email 
            })
            .then(res => {
                setIsLoading(false)
                console.log(res.data)
                notification('success', res.data)
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
                notification('error', err.response.data.errorMessage)
            })
            setEmail('')
        }else {
            setErrorMsg("You have to enter a valid email!")
        }
    }

const notification = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  return (
    <section className="reset-password">
        {contextHolder}
        <form className="container" onSubmit={sendEmailToGetResetToken} >
            <div className="icon" onClick={goBack}> <ArrowLeftOutlined /></div>
            <h2>Reset Password</h2>
            <p>Enter the email associated with your account and we'll
                send an email with instructions to reset your password.
            </p>
            
            <div className="input">
                <label htmlFor="email" className="mini-head">Email</label>
                <input className={ isEmailError ? "form-input input-error": "form-input"} 
                    type="email" 
                    value={email}
                    onChange={getEmail}
                    required
                    placeholder="Enter email address"
                />
                <p className='red-info'>{ isEmailError ? errorMsg : ""}</p>
            </div>

            { isLoading ?  <Spin indicator={antIcon} />  :
                <button className="btn btn-large">Send</button>
            }
        </form>
    </section>
  )
}

export default ResetPassword