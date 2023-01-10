import { errorNotification } from "../antd/Notification";

export const errorCheck = (err, message, isSignin, placement='topRight') => {
    const errResponse = err.response;
    if(errResponse.status === 500)
        errorNotification(errResponse.statusText, message, placement)
    else if(err.reponse?.status === 404) 
        errorNotification(errResponse.statusText, "Server link not found", placement)
    else if(err.reponse?.status === 400) 
    errorNotification(errResponse.statusText, "Missing username or password", placement)
    else if(err.response?.status === 401) 
        errorNotification(errResponse.statusText, "Unauthorized", placement)

    else if(err.response?.status === 409) 
        errorNotification(errResponse.statusText, "Passwords Do not match or Email already alreay exists", placement)
    else if(err.response?.status === 410) 
        errorNotification(errResponse.statusText, "Email Aready Exists", placement)
    else if(isSignin)
        errorNotification(err.response.data, "Error noticed!")
    else 
    errorNotification(errResponse.data.errorMessage, err.message)
    console.log(err)
}