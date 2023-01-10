import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Spin } from 'antd';
import { ArrowLeftOutlined,
        LoadingOutlined, CheckCircleOutlined,
        CloseCircleOutlined
} from '@ant-design/icons'


import '../../styles/authpassword.scss';
import { message, } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const VerifySignup = () => {
    let navigate = useNavigate()
    const goBack = () => navigate(-1)

    const [messageApi, contextHolder] = message.useMessage();

    const [queryParams] = useSearchParams() 
    const[verifyMessage, setMessage] = useState({})
    const[isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const verificationUrl = `/auth/verify-registration?${queryParams}`
        setIsLoading(true)
        axios.get((verificationUrl))
        .then(res => {
            console.log(res.data)
            setMessage(res.data)
            setIsLoading(false)

        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    }, [queryParams])

    const resendVerificationMail = (e) => {
        e.preventDefault()
        const newTokenUrl = `/auth/resend-verification-token?${queryParams}`

        setIsLoading(true)
        axios.get(newTokenUrl)
        .then(res => {
            console.log(res.data)
            setIsLoading(false)
            notification('success', res.data)
        })
        .catch(err => {
            console.log(err)
            setIsLoading(false)
            notification('error', err.response.data.errorMessage)
        })
    }


    const notification = (type, content) => {
        messageApi.open({
          type: type,
          content: content,
          message: "Lady Bug Pajamas",
        });
      };

  return (
    <section className="verify-section">
        { contextHolder }
        <div>
            {
                isLoading ? 
                <Spin indicator={antIcon} /> : 
               ( 
                    <form className="container">
                        <div className="icon" onClick={goBack}> <ArrowLeftOutlined /></div>
                        <h2>Verify Registration</h2>
                        {
                            verifyMessage.message === 'SUCCESSFUL' ? 
                            <div className="response">
                                <CheckCircleOutlined style={{ fontSize: "200px", color: "#7b3aed"}} id="check-icon" />
                                <p>Token Verified!</p>  
                                    { isLoading ?  <Spin indicator={antIcon} /> : 
                                        <Link to="/auth/signin" className="btn btn-large link">Click to Login</Link>
                                     }
                            </div>
                                : 
                            <div className="response">
                                <CloseCircleOutlined style={{ fontSize: "200px", color: "red"}} id="check-icon" />
                                <p style={{fontWeight: "bold"}}>Invalid or Expired Token!</p> 
                                
                                { isLoading ?  <Spin indicator={antIcon} />  :
                                    <button className="btn btn-large" onClick={resendVerificationMail}>
                                        Click to Resend Verification Mail  
                                    </button>
                                }
                            </div>
                        }
                    </form>
                )
            }
        </div>
    </section>
  )
}

export default VerifySignup