import { useState, useReducer, } from 'react'
import { errorNotification, successNotification,  } from '../../antd/Notification'

import '.././../styles/authpassword.scss'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import { checkAllFields, field, reducer } from '../../reducer/signupReducer'

import { ArrowLeftOutlined, EyeOutlined,
    EyeInvisibleOutlined, LoadingOutlined
} from '@ant-design/icons'

import { DatePicker, Radio, Spin } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { errorCheck } from '../../endpoints/errorCheck'

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';


const Signup = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    let navigate = useNavigate()
    const goBack = () => navigate(-1)

    const[isLoading, setIsLoading] = useState(false)

    const[iconVisible, setIconVisibility] = useState(false)
    const[icon2Visible, setIconVisibility2] = useState(false)
    const[state, dispatch] = useReducer(reducer, field) 

    const changeVisibility = () => setIconVisibility(!iconVisible)
    const changeVisibility2 = () => setIconVisibility2(!icon2Visible)
 
    const getFirstName =  e => dispatch({ type: "FIRSTNAME", value: e.target.value})
    const getLastName = e => dispatch({ type: "LASTNAME", value: e.target.value})
    const getPassword = e => dispatch({ type: "password", value: e.target.value})
    const getEmail = e => dispatch({ type: "email", value: e.target.value})
    const getPhoneNumber = e => dispatch({ type: "phoneNumber", value: e.target.value})
    const getDateOfBirth = (_, dateString) => dispatch({ type: "dateOfBirth", value: dateString })
    
    const getStreet = e => dispatch({ type: "street", value: e.target.value})
    const getHouseAddress = e => dispatch({ type: "houseAddress", value: e.target.value})
    const getCity = e => dispatch({ type: "city", value: e.target.value})
    const getState = e => dispatch({ type: "state", value: e.target.value})

    const getConfirmPassword = e => dispatch({ type: "confirmPassword", value: e.target.value})
    const getGenderValue = e => dispatch({type: "gender", value: e.target.value})

    const iconVisibilityToggle = iconVisible ? <EyeOutlined /> :  <EyeInvisibleOutlined /> 
    const icon2VisibilityToggle = icon2Visible ? <EyeOutlined /> :  <EyeInvisibleOutlined /> 

    const checkPhoneNumberValid  = state.isPhoneNumberError ? "form-input input-error" : "form-input"

    const checkPasswordMatch = state.passwordMatchError ? "form-input input-error" : "form-input"
    const confirmPasswordInfoText = state.passwordMatchError ? 'Passwords do not match.' : ''
    const passwordInfoText = state.passwordMatchError 
    ? "Password must be at leat 8 characters with one uppercase letter and one symbol.": ""

    const firstNameErrorMsg =  
        state.isFirstnameError ? <p className='red-info'>Name length must be greater than 1.</p> : " " 
 
    const lastNameErrorMsg =  
        state.isFirstnameError ? <p className='red-info'>Name length must be greater than 1.</p> : " "    

        let validInput = state.isPhoneNumberError || state.isEmailError ||
        state.isFirstnameError || state.isLastNameError;
    
    
    const signup = (e) => {
 
        const url = "/auth/signup"
        e.preventDefault()
        console.log("novalidInput: " + validInput)
        console.log("checkAllFields: " + checkAllFields())
        console.log("novalidInput: " + state.isPhoneNumberError)

        if(!checkAllFields() && validInput)
            errorNotification("Fields cannot be empty")
        else{    
            setIsLoading(true)
            axios.post(url, state)
            .then(res => {
                console.log(res.data)
                setIsLoading(false)
                successNotification(res.data, `Check email To Verify Account`, 'topRight')
            })
            .catch(err => {
                setIsLoading(false)
                errorCheck(err, "Registration Failed", false, "topRight");
            })

            dispatch({type: "reset"})
        }
    }


  return (
    <section className="sign-up">

        <form className="container" onSubmit={signup}>
            
            <div className="icon" onClick={goBack}> <ArrowLeftOutlined /></div>
            <h2>Sign up</h2>
            <p style={{marginTop: '-10px'}}>Welcome to the online book store.</p>

            <div className="input">
                <div className="name">
                    <input className="form-input" type="text" placeholder="Firstname" required
                        value={state.firstName} 
                        onChange={getFirstName}
                    />
                    <input className="form-input" type="text" 
                        value={state.lastName} placeholder="Lastname" required
                        onChange={getLastName}
                    />
                </div>
                {state.isLastNameError ? lastNameErrorMsg : firstNameErrorMsg}                        
            </div>

            <div className="input">
                <div className="name">
                    <div className="email-div">
                        <input className={state.isEmailError ? "form-input input-error": "form-input"} type="email" 
                            onChange={getEmail}
                            value={state.email} required
                            placeholder="Email" />
                        <p className='red-info'>{ state.isEmailError ? "Enter a valid email." : ""}</p>
                    </div>

                    <div className="phoneNumber-div">
                        <input id="text" className={checkPhoneNumberValid} type="number" maxLength="14"
                            onChange={getPhoneNumber} required
                            value={state.phoneNumber}
                            placeholder="Phone Number" />
                        { state.isPhoneNumberError ? <p className='red-info'>Only numbers, plus sign and max length is 14</p> : " " }                        
                    </div>
                </div>
            </div>

            <div className="input">
                <div className="address">
                <input id="street" className="form-input"type="text" 
                value={state?.address?.street}
                    required
                    onChange={getStreet} placeholder="Street"/>
                <input id="h_address" className="form-input"type="text"  
                value={state?.address?.houseAddress}
                    required
                    onChange={getHouseAddress} placeholder="House Address"/>
                <input id="city" className="form-input"type="text"  
                    required
                value={state?.address?.city}
                    onChange={getCity} placeholder="City"/>
                <input id="state" className="form-input"type="text" 
                    required
                value={state?.address?.state} 
                    onChange={getState} placeholder="State"/>
                </div>
            </div>
            
            
            <div className="input">
                <DatePicker onChange={getDateOfBirth}
                placeholder='Select Date of Birth'
                defaultValue={dayjs('2020-01-01', dateFormat)}  />
            </div>

            <div className="input">
                <Radio.Group defaultValue="MALE" buttonStyle="solid" onChange={getGenderValue}>
                    <Radio.Button style={{width: '33.3%'}} value="MALE">MALE</Radio.Button>
                    <Radio.Button style={{width: '33.3%'}} value="FEMALE">FEMALE</Radio.Button>
                    <Radio.Button style={{width: '33.3%'}} value="OTHER">OTHER</Radio.Button>
                </Radio.Group>
            </div>

            <div className="input">
                <input className={checkPasswordMatch}
                    type={ iconVisible ? "text" : "password"} 
                    placeholder="Password"
                    required
                    value={state.password}
                    onChange={getPassword}
                />
                <div id="icon-see1" onClick={ changeVisibility }>
                    { iconVisibilityToggle }
                </div>
                <p className="red-info">{passwordInfoText}</p>
            </div>

            <div className="input">
                <input className={checkPasswordMatch}
                    type={ icon2Visible ? "text" : "password" } 
                    value={state.confirmPassword}
                    required
                    placeholder="Confirm password" onChange={getConfirmPassword} 
                />
                <div id="icon-see2" onClick={ changeVisibility2 }>
                    {icon2VisibilityToggle}
                </div>
                 <p className='red-info'>{ confirmPasswordInfoText }</p> 
            </div>

             
             { isLoading ?  
               <Spin indicator={antIcon} /> : 
                <button className="btn btn-large">Get Started</button>
             }

            <div className="login-link-div">
                <p style={{textAlign: "center"}}>Already have an account? <Link to="/auth/signin" 
                className="link">Sign in</Link></p>
            </div>

        </form>
    </section>
  )
}

export default Signup