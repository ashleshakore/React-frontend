import actionTypes from './actions';
import {List, Map} from "immutable";

const initialState = Map({
    studentId:null,
    testList:[],
    examId: null,
    resultList:[],
    /*
    {
        examId:1,
        subQList:List(),
        objQList:List()
    }
    */
    studentAnswers:Map(),
    /*
    {
        subAnsList:List(),
        objAnsList:List()
    }
    */

    // subQList:List(),
    // [""]
    // subAnsList:List(),
    // objQList:List(),
    // [{
    //     q:"",
    //     options:[]
    // }]
    // objAnsList:List()
});

export default function studentReducer(state=initialState, action) {

    switch(action.type){
        case actionTypes.STUDENT_DATA_LOADED:
            return state.merge({
                studentId:action.payload.studentId,
                testList:action.payload.testList
            });
        case actionTypes.RESULT_DATA_LOADED:
            return state.merge({
                studentId:action.payload.studentId,
                resultList:action.payload.resultList
            });
        case actionTypes.SET_TEST:
            console.log("Reducer examId: ", action.payload)
            return state.merge({examId: action.payload});
        default :
            return state;
    }
}