const actionTypes = {
    SET_TOKEN:"SET_TOKEN",
    STUDENT_LIST_LOADED:"STUDENT_LIST_LOADED",
    TEACHER_LIST_LOADED:"TEACHER_LIST_LOADED"
}

export const setToken = (token)=>{
    return {
        type:actionTypes.SET_TOKEN,
        payload:token
    }
}

export const studentListLoaded = (data)=>{
    return {
        type:actionTypes.STUDENT_LIST_LOADED,
        payload:data
    }
}

export const teacherListLoaded = (data)=>{
    return {
        type:actionTypes.TEACHER_LIST_LOADED,
        payload:data
    }
}
export default actionTypes;