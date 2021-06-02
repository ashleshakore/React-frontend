import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import * as actionCreator from './actions';
import {connect} from 'react-redux';
import * as loadingActionCreator from '../Loading/actions';
import { withRouter } from 'react-router-dom';
import config from '../../config/config.json';

export class LoginHelper extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            errorMessage:''
        }
    }
    // componentDidMount(){
    //     if(window.sessionStorage.getItem("sessionToken") != null){
    //         window.sessionStorage.setItem("sessionToken", null);
    //         window.sessionStorage.setItem("username", null);
    //         window.sessionStorage.setItem("userType", null);
    //         this.props.history.push('/login');
    //     }
    // }
    setEmail(username) {
        this.setState({username});
    }
    setPassword(password) {
        this.setState({password});
    }
    validateForm(){
        return !(this.state.username.length > 0 && this.state.password.length > 0);
    }
    loginSubmitted(e){
        e.preventDefault();
        this.props.showLoading();
        let data={
            username:this.state.username,
            password:this.state.password
        }
        axios.post(config.serviceUrl + this.props.validateURL, data)
        .then(response => {
            console.log(response);
            response={ 
                data: {
                    token:'testToken',
                    username:'',
                    isLoginSuccessful:"true"
                }
            };
            if(response.data.isLoginSuccessful == "true"){
                window.sessionStorage.setItem("sessionToken", response.data.token);
                window.sessionStorage.setItem("username", this.state.username);
                window.sessionStorage.setItem("userType", this.props.userType);
                this.props.history.push(this.props.successRedirect);
                this.props.setUserName(this.state.username);
            } else {
                this.setState({notification:"Username or password is incorrect"});
                this.props.history.push('/error');
            }
            this.props.hideLoading();
        });
    }
    render() {
        return (
            <Form onSubmit={(e)=>this.loginSubmitted(e)}>
                
                {/* <h1 style={{'fontSize':'35px'}}>Create Student</h1> */}
             <div style={{'paddingTop':'50px','paddingLeft':'450px','paddingTop':'30px'}}> 
                <div class="card" style={{'width':'500px','height':'300px'}}>
                <div class="card-body">
                <h5 class="card-title" style={{'fontSize':'40px','fontFamily':'inherit'}}>Log in</h5>
                <div style={{'paddingLeft':'40px','paddingTop':'20px'}}> 
                    <Form.Group as={Row} controlId="formBasicEmail" style={{'paddingTop':'20px'}}>
                    {/* <Form.Label column sm={2}>Username</Form.Label> */}
                    <Col sm={10}>
                        <Form.Control
                            value={this.state.username}
                            onChange={(e) => this.setEmail(e.target.value)}
                            type="Username" 
                            placeholder="Enter username" 
                        />
                    </Col>
                </Form.Group></div>
                <div  style={{'paddingLeft':'40px'}}>
                <Form.Group as={Row} controlId="formBasicPassword">
                    {/* <Form.Label column sm={2}>Password</Form.Label> */}
                    <Col sm={10}>
                        <Form.Control 
                            type="password"
                            placeholder="Password" 
                            value={this.state.password}
                            onChange={(e) => this.setPassword(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                </div>
                </div>
                </div>
                </div> 
                <div style={{'paddingTop':'30px'}}>
                <Button variant="primary" type="submit" disabled={this.validateForm()}>
                    Submit
                </Button>
                </div>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken:(token)=>dispatch(actionCreator.setToken(token)),
        showLoading:()=>dispatch(loadingActionCreator.showLoadingAction()),
        hideLoading:()=>dispatch(loadingActionCreator.hideLoadingAction()),
        setUserName:(userName)=>dispatch(actionCreator.setUserName(userName))
    }
}
export default connect(null, mapDispatchToProps)(withRouter(LoginHelper));