import React from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import * as actionCreator from './actions';
import {connect} from 'react-redux';
import * as loadingActionCreator from '../Loading/actions';
import { withRouter } from 'react-router-dom';

export class DeleteTeacher extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username : ''
        }
    //    this.handleChange = this.handleChange.bind(this)
    }
    //handleChange(event) {
     //   this.setState({
     //     id_photo: URL.createObjectURL(event.target.files[0])
     //   })
     // }
   
    setLogin(username) {
        this.setState({username});
    }
    
    componentDidMount(){
        if(window.sessionStorage.getItem("sessionToken") == null){
            this.props.history.push('/login');
        }
        else if(window.sessionStorage.getItem("userType") != 'admin'){
            window.sessionStorage.setItem("sessionToken", null);
            window.sessionStorage.setItem("username", null);
            window.sessionStorage.setItem("userType", null);
            this.props.history.push('/login');
        }
    }
    validateForm(){
        return !(this.state.username.length > 0);
    }
    formSubmitted(e){
        e.preventDefault();
        this.props.showLoading();
        let data={
            username:this.state.username
        }
        //let loginValidateUrl = this.props.validateURL;
        let loginValidateUrl = 'https://reqres.in/api/articles';
        axios.post(loginValidateUrl, data)
        .then(res => {
            console.log(res.data);
            this.props.hideLoading();
            this.props.history.push('/admin/dashboard');
        }).catch(err => {
            console.log(err);
            this.props.hideLoading();
        })
    }
    render() {
        return (
            
            <Form onSubmit={(e)=>this.formSubmitted(e)} style={{'paddingLeft':'300px','paddingRight':'300px'}}>
                <h1 style={{'fontSize':'30px'}}>Delete Teacher</h1>
                <div style={{'paddingTop':'150px','backgroundColor':'skyblue'}}>
                <div class="card">
            <div class="card-body">
            <Form.Group controlId="formBasiclogin">
                    <Form.Label>Login id</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Login-Id" 
                        value={this.state.login_id}
                        onChange={(e) => this.setLogin(e.target.value)}
                    />
                </Form.Group>
            </div>
          </div>
          </div> 
                <div style={{'paddingTop':'50px'}}>
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
        hideLoading:()=>dispatch(loadingActionCreator.hideLoadingAction())
    }
}
export default connect(null, mapDispatchToProps)(withRouter(DeleteTeacher));