import actionTypes from './actions';
import { Map } from "immutable";

const initialState = Map({
    sessionToken:null,
    userName:null
});

export default function loginReducer(state=initialState, action) {

    switch(action.type){
        case actionTypes.SET_TOKEN:
            return state.merge({sessionToken:action.payload});
        case actionTypes.SET_USERNAME:
            return state.merge({userName:action.payload});
        default :
            return state;
    }
}