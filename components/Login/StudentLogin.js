import React from 'react';
import LoginHelper from './LoginHelper';


export default class StudentLogin extends React.Component {
    
    render() {
        return (
            <LoginHelper validateURL={'/studentlogin'}
                // successRedirect={'/student/dashboard'}
                successRedirect={'/student/imageauth'}
                userType={'student'}/>
        );
    }
}