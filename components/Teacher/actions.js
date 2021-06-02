const actionTypes = {
    SUB_Q_ADDED:"SUB_Q_ADDED",
    OBJ_Q_ADDED:"OBJ_Q_ADDED",
    SUB_Q_DISPLAY:"SUB_Q_DISPLAY",
    OBJ_Q_DISPLAY:"OBJ_Q_DISPLAY",
    DELETE_SUB_Q:"DELETE_SUB_Q",
    DELETE_OBJ_Q:"DELETE_OBJ_Q",
    PAPER_DATA_LOADED:'PAPER_DATA_LOADED',
    EVAL_DATA_LOADED:"EVAL_DATA_LOADED",
    SET_PAPER:"SET_PAPER",
    SET_MARKS:"SET_MARKS"
}

export const subQdisplay = (q)=>{
    return {
        type:actionTypes.SUB_Q_DISPLAY,
        payload:q
    }
}
export const objQdisplay = (q)=>{
    return {
        type:actionTypes.OBJ_Q_DISPLAY,
        payload:q
    }
}
export const paperDataLoaded = (data)=>{
    return {
        type:actionTypes.PAPER_DATA_LOADED,
        payload:data
    }
}
export const objQAdded = (q)=>{
    return {
        type:actionTypes.OBJ_Q_ADDED,
        payload:q
    }
}
export const subQAdded = (q)=>{
    return {
        type:actionTypes.SUB_Q_ADDED,
        payload:q
    }
}
export const setMarks = (data)=>{
    return {
        type:actionTypes.SET_MARKS,
        payload:data
    }
}


export const deleteSubQ = (qNo)=>{
    return {
        type:actionTypes.DELETE_SUB_Q,
        payload:qNo
    }
}

export const deleteObjQ = (qNo)=>{
    return {
        type:actionTypes.DELETE_OBJ_Q,
        payload:qNo
    }
}

export const setPaper = (data)=>{
    return {
        type:actionTypes.SET_PAPER,
        payload:data
    }
}

export const EvalDataLoaded = (data)=>{
    return {
        type:actionTypes.EVAL_DATA_LOADED,
        payload:data
    }
}
export default actionTypes;