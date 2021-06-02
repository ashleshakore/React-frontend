const actionTypes = {
    SET_TOKEN:"SET_TOKEN",
    SET_USERNAME:"SET_USERNAME"
}

export const setToken = (token)=>{
    return {
        type:actionTypes.SET_TOKEN,
        payload:token
    }
}

export const setUserName = (userName)=>{
    return {
        type:actionTypes.SET_USERNAME,
        payload:userName
    }
}

export default actionTypes;