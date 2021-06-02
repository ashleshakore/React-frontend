import React from 'react';
import Button from 'react-bootstrap/Button';
//import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Col, Container, Row, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Login extends React.Component{
    toAdmin(){
        this.props.history.push('/admin/login');
    }
    componentDidMount(){
        if(window.sessionStorage.getItem("sessionToken") != null){
            window.sessionStorage.setItem("sessionToken", null);
            window.sessionStorage.setItem("username", null);
            window.sessionStorage.setItem("userType", null);
            this.props.history.push('/login');
        }
    }
    render(){
        return (
            <Container style={{'paddingTop':'200px'}}>
               <div style={{'paddingBottom':'10px'}}>
               <Button as={Link} to="/student/login" variant='primary' size='lg' style={{'width':'250px'}} >
                    Student Login
                </Button><br/>
               </div>
               <div style={{'paddingBottom':'10px'}}>
               <Button as={Link} to="/teacher/login" variant='primary' size='lg' style={{'width':'250px'}}>
                    Teacher Login
                </Button><br/>
               </div>
               <div></div>
                
               
                <Button as={Link} to="/admin/login" variant='primary' size='lg' style={{'width':'250px'}}>
                    Administrator Login
                </Button>
            
            </Container>
        );
    }
}