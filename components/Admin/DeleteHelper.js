import React from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import * as actionCreator from './actions';
import {connect} from 'react-redux';
import * as loadingActionCreator from '../Loading/actions';
import { withRouter } from 'react-router-dom';

export class DeleteStudent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            first_name : '',
            last_name :'',
            middle_name : '',
            login_id : '',
            password :''
        }
    //    this.handleChange = this.handleChange.bind(this)
    }
    //handleChange(event) {
     //   this.setState({
     //     id_photo: URL.createObjectURL(event.target.files[0])
     //   })
     // }
   
    setLogin(login_id) {
        this.setState({ login_id});
    }
    setPassword(password) {
        this.setState({password});
    }
    setLast(last_name) {
        this.setState({last_name});
    }
    setMiddle(middle_name) {
        this.setState({middle_name});
    }
    setFirst(first_name) {
        this.setState({first_name});
    }
    
    validateForm(){
        return !(this.state.login_id.length > 0 && this.state.first_name.length > 0 && this.state.middle_name.length > 0 && this.state.last_name.length > 0 && this.state.password.length );
    }
    formSubmitted(e){
        e.preventDefault();
        this.props.showLoading();
        let data={
            username:this.state.username,
            password:this.state.password
        }
        //let loginValidateUrl = this.props.validateURL;
        let loginValidateUrl = 'https://reqres.in/api/articles';
        axios.post(loginValidateUrl, data)
        .then(response => {
            console.log(response);
            let dummyresponse={
                token:'testToken',
                username:'',
                loginSuccess:true
            };
            if(dummyresponse.loginSuccess == true){
                window.sessionStorage.setItem("sessionToken", dummyresponse.token);
                //this.props.setToken(dummyresponse.token);
                this.props.history.push('/admin/dashboard');
            } else {
                this.setState({notification:"Check the information entered"});
                this.props.history.push('/error');
            }
            this.props.hideLoading();
        });
    }
    render() {
        return (
            
            <Form onSubmit={(e)=>this.formSubmitted(e)} style={{'paddingLeft':'600px'}}>
                <h1 style={{'fontSize':'20px'}}>Create Teacher</h1>
                <Row>
                <Form.Group controlId="formBasicfirstname" style={{'paddingTop':'20px'}}>
                    <Form.Label>First</Form.Label>
                    <Form.Control
                        value={this.state.first_name}
                        onChange={(e) => this.setFirst(e.target.value)}
                        type="text" 
                        placeholder="Firstname" 
                    />
                </Form.Group>
                <Form.Group controlId="formBasicMiddleName" style={{'paddingTop':'20px'}}>
                    <Form.Label>Middle name</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Middename" 
                        value={this.state.middle_name}
                        onChange={(e) => this.setMiddle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasiclastname" style={{'paddingTop':'20px'}}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Last name" 
                        value={this.state.last_name}
                        onChange={(e) => this.setLast(e.target.value)}
                    />
                </Form.Group>
                </Row>
                <Form.Group controlId="formBasiclogin">
                    <Form.Label>Login id</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Login-Id" 
                        value={this.state.login_id}
                        onChange={(e) => this.setLogin(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Password" 
                        value={this.state.password}
                        onChange={(e) => this.setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={this.validateForm()}>
                    Submit
                </Button>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken:(token)=>dispatch(actionCreator.setToken(token)),
        showLoading:()=>dispatch(loadingActionCreator.showLoadingAction()),
        hideLoading:()=>dispatch(loadingActionCreator.hideLoadingAction())
    }
}
export default connect(null, mapDispatchToProps)(withRouter(CreateTeacher));