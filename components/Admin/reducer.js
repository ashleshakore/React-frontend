import actionTypes from './actions';
import { Map } from "immutable";

const initialState = Map({
    sessionToken:null,
    studentList:[],
    teacherList:[]
});

export default function adminReducer(state=initialState, action) {

    switch(action.type){
        case actionTypes.SET_TOKEN:
            return state.merge({sessionToken:action.payload});
        case actionTypes.STUDENT_LIST_LOADED:
            return state.merge({
                studentList:action.payload.studentList
                });
        case actionTypes.TEACHER_LIST_LOADED:
             return state.merge({
                teacherList:action.payload.teacherList
                });
        default :
            return state;
    }
}