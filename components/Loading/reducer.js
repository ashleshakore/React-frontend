import actionTypes from './actions';
import {Map} from "immutable";

const initialState = Map({
    isLoading:false
});

export default function loadingReducer(state=initialState, action) {

    switch(action.type){
        case actionTypes.SHOW_LOADING:
            return state.merge({isLoading:true});
        case actionTypes.HIDE_LOADING:
            return state.merge({isLoading:false});
        default :
            return state;
    }
}