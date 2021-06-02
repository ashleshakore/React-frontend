import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from './actions';
import * as loadingActionCreator from '../Loading/actions';
import Button from 'react-bootstrap/Button';
import { Container, Alert, Row,Col,Nav,Tab } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config/config.json';

class EvaluateDash extends React.Component{

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
        else if (window.sessionStorage.getItem("userType") != 'teacher'){
                window.sessionStorage.setItem("sessionToken", null);
                window.sessionStorage.setItem("username", null);
                window.sessionStorage.setItem("userType", null);
                this.props.history.push('/login');
            }
        else
        {
            let sampleData={
            //username:'ash',
            studentList:[{
            examId:111,
            subject:'English',
            studentId:'student1'
            },
            {
               examId:222,
               subject:'Maths',
               studentId:'student2'
            }]
            };
        
            this.props.showLoading();
            // const url='http://slowwly.robertomurray.co.uk/delay/2000/url/https://jsonplaceholder.typicode.com/todos/1'
            // axios.get(config.serviceUrl + '/studentdata')
            //https://jsonplaceholder.typicode.com/todos/1?username=
            let geturl =('https://jsonplaceholder.typicode.com/todos/1?username='+this.state.username) ;
           // let get2 =('https://jsonplaceholder.typicode.com/todos/1?username='+this.state.username) ;
            console.log(geturl);
            axios.get(geturl)
            .then(response=>{
                response.data = sampleData;
                this.setState({studentData:response.data});
                this.props.hideLoading();
                this.props.EvalDataLoaded(response.data);
            })
            .catch(error=>console.log(error));
            // axios.get(get2)
            // .then(response=>{
            //     response.data = sampleData2;
            //     this.setState({resultData:response.data});
            //     this.props.hideLoading();
            //     this.props.resultDataLoaded(response.data);
            // })
            // .catch(error=>console.log(error));
        }
    }
    gotodash(){
        this.props.history.push('/teacher/dashboard');
    }
    fetch(index){
        this.props.setMarks(this.state.studentData.studentList[index].examId);
        this.props.history.push('/teacher/evaluatetest');
    }
    logout(){
        window.sessionStorage.setItem("sessionToken", null);
        window.sessionStorage.setItem("username", null);
        window.sessionStorage.setItem("userType", null);
        this.props.history.push('/login');
       }
    // result(){
    //     this.props.history.push('/student/result');
    //    }
    render(){
        const {studentList} = this.state.studentData;
        const{username}=this.state;
        console.log(this.state.studentData,'this is studentlist');
        // console.log(username);
        return (
            <Container>
                <h1>Evaluate Dashboard</h1>
                {<div>
                     <div style={{'paddingTop':'30px'}}>
                    <Alert variant={'primary'} >
                        Teacher Id:{username}
                    </Alert>
                    </div>  
                    {studentList.length>0
                    ?   <div>
                            <Alert variant={'primary'}>Evalaute</Alert>

                            {
                                studentList.map((studentList, index)=>{
                                    return <div>
                                        <Alert variant={'primary'}>
                                        <Row>
                                        <div style={{'paddingRight':'10px'}}> Exam Id: {studentList.examId}</div>
                                        </Row>
                                        <Row><div>Subject: {studentList.subject}</div></Row>
                                        <Row><div>studentId: {studentList.studentId}</div></Row>
                                        <Button variant="primary" onClick={()=>this.fetch(index)}>
                                            Evaluate
                                        </Button>
                                        </Alert>
                                    </div>
                                })
                            }

                            
                        </div>   
                    :   <Alert variant={'primary'}>
                            Test Not Scheduled for you yet
                        </Alert>
                    }
                </div>}
                {/* <Button variant="primary" onClick={()=>this.result()}>
                    Results
                </Button> */}
                <Button variant="primary" onClick={()=>this.logout()}>
                    Log Out
                </Button>
                <Button variant="primary" onClick={()=>this.gotodash()}>
                    Go to Dashboard
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
        EvalDataLoaded:(data)=>dispatch(actionCreator.EvalDataLoaded(data)),
        setMarks:(data)=>dispatch(actionCreator.setMarks(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EvaluateDash);