import actionTypes from './actions';
import {List, Map} from "immutable";

const initialState = Map({
    subQList:List(),
    // [""]
    objQList:List(),
    subjQList:List(),
    // [""]
    objeQList:List(),
    paperList:[],
    examId:null,
    studentList:[]
    // [{
    //     q:"",
    //     options:[],
    //     ans:""
    //     marks:""
    // }]
});

export default function teacherReducer(state=initialState, action) {

    switch(action.type){
        case actionTypes.SUB_Q_ADDED:
            let subQList = state.get('subQList').push(action.payload);
            return state.merge({subQList});
        case actionTypes.OBJ_Q_ADDED:
            let objQList = state.get('objQList').push(action.payload);
            return state.merge({objQList});
        case actionTypes.OBJ_Q_DISPLAY:
            let objeQList = state.get('objQeList');
            return state.merge({objeQList});
        case actionTypes.SUB_Q_DISPLAY:
            let subjQList = state.get('objQList');
            return state.merge({subjQList});
        case actionTypes.DELETE_OBJ_Q:
            let objQList1 = state.get('objQList').delete(action.payload);
            return state.merge({objQList: objQList1});
        case actionTypes.DELETE_SUB_Q:
            let subQList1 = state.get('subQList').delete(action.payload);
            return state.merge({subQList: subQList1});
        case actionTypes.PAPER_DATA_LOADED:
            return state.merge({
                username:action.payload.username,
                paperList:action.payload.paperList
                });
        case actionTypes.EVAL_DATA_LOADED:
            return state.merge({
                studentId:action.payload.studentId,
                studentList:action.payload.studentList
                });
        case actionTypes.SET_PAPER:
            console.log("Reducer examId: ", action.payload)
            return state.merge({examId: action.payload});
        case actionTypes.SET_MARKS:
                console.log("Reducer examId: ", action.payload)
                return state.merge({username: action.payload});
        default :
            return state;
    }
}