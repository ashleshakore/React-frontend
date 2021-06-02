import React from 'react';
import LoginHelper from './LoginHelper';

export default class AdminLogin extends React.Component {
    
    render() {
        return (
            <LoginHelper validateURL={'/adminlogin'} 
                successRedirect={'/admin/dashboard'}
                userType={'admin'}/>
        );
    }
}