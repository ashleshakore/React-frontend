import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import AdminLogin from './components/Login/AdminLogin';
import Loading from './components/Loading/Loading';
import StudentLogin from './components/Login/StudentLogin';
import TeacherLogin from './components/Login/TeacherLogin';
import TeacherDashboard from './components/Teacher/Dashboard';
import EvaluateTest from './components/Teacher/EvaluateTest';
import ViewPaper from './components/Teacher/ViewPaper';
import QuestionDashboard from './components/Teacher/QuestionDashboard';
import AddTest from './components/Teacher/AddTest';
import AdminDashboard from './components/Admin/Dashboard';
import CreateStudent from './components/Admin/CreateStudent';
import CreateTeacher from './components/Admin/CreateTeacher';
import DeleteStudent from './components/Admin/DeleteStudent';
import DeleteTeacher from './components/Admin/DeleteTeacher';
import Student from './components/Student/Student';
import TakeTest from './components/Student/TakeTest';
import ErrorPage from './components/ErrorPage';
import {Switch, Route} from 'react-router-dom';
//import ResultDashboard from './components/Student/ResultDashboard';
import EvaluateDash from './components/Teacher/EvaluateDash';
import PhotoAuth from './components/Student/PhotoAuth';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route path="/" component={Login} exact={true}/>
          <Route path="/login" component={Login}/>
          <Route path="/teacher/addtest" component={AddTest}/>
          <Route path="/teacher/dashboard" component={TeacherDashboard}/>
          <Route path="/teacher/evaluatetest" component={EvaluateTest}/>
          <Route path="/teacher/paperlist" component={QuestionDashboard}/>
          <Route path="/teacher/questionpaper" component={ViewPaper}/>
          <Route path="/student/imageauth" component={PhotoAuth}/>
          <Route path="/student/dashboard" component={Student}/>
          <Route path="/student/test" component={TakeTest}/>
          {/* <Route path="/student/result" component={ResultDashboard}/> */}
          <Route path="/teacher/evaluationDash" component={EvaluateDash}/>
          <Route path="/login" component={Login}/>
          <Route path="/admin/dashboard" component={AdminDashboard}/>
          <Route path="/admin/createstudent" component={CreateStudent}/>
          <Route path="/admin/createteacher" component={CreateTeacher}/>
          <Route path="/admin/deleteteacher" component={DeleteTeacher}/>
          <Route path="/admin/deletestudent" component={DeleteStudent}/>
          <Route path="/admin/login" component={AdminLogin}/>
          <Route path="/teacher/login" component={TeacherLogin}/>
          <Route path="/student/login" component={StudentLogin}/>
          <Route path="/error" component={ErrorPage}/>
          <Route component={ErrorPage}/>
        </Switch>
        <Loading/>
      </div>
    );
  }
}

export default App;