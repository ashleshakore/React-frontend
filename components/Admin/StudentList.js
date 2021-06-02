import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from './actions';
import * as loadingActionCreator from '../Loading/actions';
import Button from 'react-bootstrap/Button';
import { Container, Alert, Row } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config/config.json';

class StudentList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            studentData:{
                //studentId:null,
                studentList:[]
               
            },
            username: sessionStorage.getItem("username")
        }
    }

    componentDidMount() {
        if(window.sessionStorage.getItem("sessionToken") == null){
            this.props.history.push('/login');
        }
        else if (window.sessionStorage.getItem("userType") != 'admin'){
                window.sessionStorage.setItem("sessionToken", null);
                window.sessionStorage.setItem("username", null);
                window.sessionStorage.setItem("userType", null);
                this.props.history.push('/login');
            }
        else
        {
            let sampleData={
            username:'ash@gmail.com',
            studentList:[{
             username:'xyz',
             password:'xyz',
             year:'2',
             dept:'comp'
            },
            {
                username:'x',
                password:'xyz',
                year:'3',
                dept:'comp'
            }]
            };
            this.props.showLoading();
            // const url='http://slowwly.robertomurray.co.uk/delay/2000/url/https://jsonplaceholder.typicode.com/todos/1'
            // axios.get(config.serviceUrl + '/studentdata')
            //https://jsonplaceholder.typicode.com/todos/1?username=
            let geturl =('https://jsonplaceholder.typicode.com/todos/') ;
            console.log(geturl);
            axios.get(geturl)
            .then(response=>{
                response.data = sampleData;
                this.setState({resultData:response.data});
                this.props.hideLoading();
                this.props.studentListLoaded(response.data);
            })
            .catch(error=>console.log(error));
        }
    }

   
    logout(){
        window.sessionStorage.setItem("sessionToken", null);
        window.sessionStorage.setItem("username", null);
        window.sessionStorage.setItem("userType", null);
        this.props.history.push('/login');
       }
       gotodash(){
        this.props.history.push('/admin/dashboard');
       }
    render(){
        const {studentList} = this.state.studentData;
        const{username}=this.state;
        //console.log(this.state.resultData,'this is resultlist');
        // console.log(username);
        return (
            <Container>
                <h1>Student List</h1>
                {<div>
                     <div style={{'paddingTop':'30px'}}>
                    <Alert variant={'primary'} >
                        Admin Id:{username}
                    </Alert>
                    </div>  
                    {studentList.length>0
                    ?   <div>
                            <Alert variant={'primary'}>Student List</Alert>

                            {
                                studentList.map((studentList, index)=>{
                                    return <div>
                                        <Alert variant={'primary'}>
                                        <Row> <div>Username : {studentList.username}</div></Row>
                                        <Row>
                                        <div> Password :{studentList.password}</div>
                                        </Row>
                                       <Row><div>Year : {studentList.year}</div></Row>
                                       <Row> <div>Department : {studentList.dept}</div></Row>
                                        </Alert>
                                    </div>
                                })
                            }

                            
                        </div>   
                    :   <Alert variant={'primary'}>
                            Result Not Scheduled for you yet
                        </Alert>
                    }
                </div>}
                <Button variant="primary" onClick={()=>this.gotodash()}>
                    Go to Dashboard
                </Button>
                <Button variant="primary" onClick={()=>this.logout()}>
                    Log Out
                </Button>
            </Container>
        );
    }
}

const mapStateToProps = (rootState) => {
    return {
        isLoading: rootState.loading.get('isLoading')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showLoading:()=>dispatch(loadingActionCreator.showLoadingAction()),
        hideLoading:()=>dispatch(loadingActionCreator.hideLoadingAction()),
        studentListLoaded:(data)=>dispatch(actionCreator.studentListLoaded(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentList);