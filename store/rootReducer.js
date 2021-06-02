import {combineReducers} from "redux";
import teacherReducer from "../components/Teacher/reducer";
import loadingReducer from "../components/Loading/reducer";
import studentReducer from "../components/Student/reducer";
import loginReducer from "../components/Login/reducer";
import adminReducer from "../components/Admin/reducer";

export default combineReducers({
    teacher: teacherReducer,
    loading: loadingReducer,
    student: studentReducer,
    login: loginReducer,
    admin: adminReducer
});