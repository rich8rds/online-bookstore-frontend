    
    // const field = {
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     phoneNumber: "",
    //     address: {
    //         street: "",
    //         houseAddress: "",
    //         city: "",
    //         state: ""
    //     },
    //     dateOfBirth: "1998-12-12",
    //     gender: "MALE",
    //     password: "",
    //     confirmPassword: "",
    //     isEmailError: false,
    //     isFirstnameError: false,
    //     isLastnameError: false,
    //     passwordMatchError: false,
    //     isPhoneNumberError: false,
    // }


    const field = {
        firstName: "Richards",
        lastName: "Ogun",
        email: "rbukunmi8@gmail.com",
        phoneNumber: "08143016908",
        address: {
            street: "5",
            houseAddress: "John main",
            city: "Benin",
            state: "Edo"
        },
        dateOfBirth: "1998-12-10",
        gender: "MALE",
        password: "#Number1234",
        confirmPassword: "#Number1234",
        isEmailError: false,
        isFirstnameError: false,
        isLastnameError: false,
        passwordMatchError: false,
        isPhoneNumberError: false,
    }


    const checkAllFields = () => {
        if(field.firstName !== '' 
            && field.lastName !== '' 
            && field.email !== '' 
            && field.phoneNumber !== '' 
            && field.address.street !== '' 
            && field.address.houseAddress !== '' 
            && field.address.city !== '' 
            && field.address.state !== '' 
            && field.confirmPassword !== '' 
            && field.password !== '') return false
        return true
    }

    const phoneNumberValidity = (phoneNumber) => {
        if(phoneNumber < 11 || phoneNumber.length > 14 )
            return true;
        if(phoneNumber.startsWith("+") && phoneNumber.length < 14)
            return true
        if(phoneNumber.startsWith("") && (phoneNumber.length !== 11))
        return true
        return false
    }

    // const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // const regex = new RegExp(/^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

    export const regex = new RegExp("^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")"
    + "@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$")
    
    const reducer = (state, action) => {
        switch(action.type) {
            case "FIRSTNAME":
                if(action.value.length === 1) return { ...state, firstName: action.value, isFirstnameError: true }
                return {...state, firstName: action.value, isFirstnameError: false }
            case 'LASTNAME': 
                if(action.value.length === 1) return { ...state, lastName: action.value, isLastnameError: true }
                return {...state, lastName: action.value, isLastnameError: true }
            
                case 'email':
                    let email = action.value
                    if(email.length === 0) 
                    return { ...state, email: email, isEmailError: false }
                    else if(!regex.test(email))
                        return { ...state, email: email, isEmailError: true }
                    return { ...state, email: email, isEmailError: false }

                case 'phoneNumber':
                    const value = phoneNumberValidity(action.value)
                    return { ...state, phoneNumber: action.value, isPhoneNumberError: value }

                case 'street':
                    return { ...state, address: { street: action.value } }
                case 'houseAddress': 
                    return { ...state, address: { houseAddress: action.value } }
                case 'city':
                    return { ...state, address: { city: action.value } }
                case 'state':
                    return { ...state, address: { state: action.value } }

                case 'dateOfBirth':
                    return { ...state,  dateOfBirth: action.value } 
                case 'gender':
                    return { ...state,  gender: action.value } 

                case 'password':  
                    let password = action.value
                    if(state.confirmPassword.length <= 8 || state.confirmPassword !== password)
                        return { ...state, passwordMatchError: true, password: password }
                    return { ...state,  password: password, passwordMatchError: false } 
                
                case 'confirmPassword':
                    let confirmPassword = action.value
                    if(state.password !== confirmPassword)
                        return { ...state, passwordMatchError: true, confirmPassword: confirmPassword }
                    return { ...state, confirmPassword: confirmPassword, passwordMatchError: false } 
            case 'reset':
                return {
                         firstName: "",
                        lastName: "",
                        email: "",
                        phoneNumber: "",
                        address: {
                            street: "",
                            houseAddress: "",
                            city: "",
                            state: ""
                        },
                        dateOfBirth: "1998-12-12",
                        gender: "MALE",
                        password: "",
                        confirmPassword: "",
                        isEmailError: false,
                        isFirstnameError: false,
                        isLastnameError: false,
                        passwordMatchError: false,
                        isPhoneNumberError: false, 
                }
            default: return state
        }
    }

    export { field, reducer, checkAllFields }