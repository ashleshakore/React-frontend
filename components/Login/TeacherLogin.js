import React from 'react';
import LoginHelper from './LoginHelper';


export default class TeacherLogin extends React.Component {
    render() {
        return (
            <LoginHelper validateURL={'/teacherlogin'} 
                successRedirect={'/teacher/dashboard'}
                userType={'teacher'}/>
        );
    }
}