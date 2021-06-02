import React from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import * as actionCreator from './actions';
import {connect} from 'react-redux';
import * as loadingActionCreator from '../Loading/actions';
import { withRouter } from 'react-router-dom';

export class CreateTeacher extends React.Component {
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
        return !(this.state.login_id.length > 0 && this.state.first_name.length > 0 && this.state.middle_name.length > 0 && this.state.last_name.length > 0 && this.state.password.length>0 );
    }
    formSubmitted(e){
        e.preventDefault();
        console.log("www");
        this.props.showLoading();
        let data={
            first_name:this.state.first_name,
            middle_name:this.state.middle_name,
            last_name :this.state.last_name ,
           username : this.state. username,
            password :this.state.password
        }
        //let loginValidateUrl = this.props.validateURL;
        //let ValidateUrl = 'https://reqres.in/api/articles';
        axios.post('https://reqres.in/api/articles/xyz', data)
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
                <h1 style={{'fontSize':'35px'}}>Create Teacher</h1>
                <div style={{'paddingTop':'50px','backgroundColor':'skyblue'}}>
                <div class="card">
                <div class="card-body">
                <h5 class="card-title">Personal Information</h5>
              <Row>
                  <div style={{'paddingRight':'10px','paddingLeft':'60px'}}>
                <Form.Group controlId="formBasicfirstname" style={{'paddingTop':'20px'}}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        value={this.state.first_name}
                        onChange={(e) => this.setFirst(e.target.value)}
                        type="text" 
                        placeholder="Firstname" 
                    />
                </Form.Group>
                </div>
                <div style={{'paddingRight':'10px'}}>
                <Form.Group controlId="formBasicMiddleName" style={{'paddingTop':'20px'}}>
                    <Form.Label>Middle name</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Middename" 
                        value={this.state.middle_name}
                        onChange={(e) => this.setMiddle(e.target.value)}
                    />
                </Form.Group>
                </div>
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
            </div>
          </div>
        </div>  
        <div style={{'paddingTop':'50px','backgroundColor':'skyblue'}}>
         <div class="card">
         <div class="card-body">
           <h5 class="card-title">Login Details</h5>
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
        hideLoading:()=>dispatch(loadingActionCreator.hideLoadingAction())
    }
}
export default connect(null, mapDispatchToProps)(withRouter(CreateTeacher));