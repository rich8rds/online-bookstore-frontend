
const field = {
            iconVisible: false,
            icon2Visible: false,
            password: '',
            confirmPassword: '',
            isPasswordMatchError: false,
        }

        
const reducer = (state, action) => {
    switch(action.type) {
        case 'password':  
        let password = action.value
        if(state.confirmPassword.length <= 8 && state.confirmPassword !== password)
            return { ...state, passwordMatchError: true, password: password }
        return { ...state,  password: password, passwordMatchError: false } 
    
        case 'confirmPassword':
            let confirmPassword = action.value
            if(state.password !== confirmPassword)
                return { ...state, passwordMatchError: true, confirmPassword: confirmPassword }
            return { ...state, confirmPassword: confirmPassword, passwordMatchError: false } 

        case 'iconVisibility': return { ...state, iconVisible: action.value }
        case 'icon2Visibility': return { ...state, icon2Visible: action.value }

        case 'clear': 
        return {
            iconVisible: false,
            icon2Visible: false,
            password: '',
            confirmPassword: '',
            isPasswordMatchError: false,
        }
        default: return state;
    }
} 


export { reducer, field}