import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from './actions';
import * as loadingActionCreator from '../Loading/actions';
import Button from 'react-bootstrap/Button';
import { Container, Alert, Row } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config/config.json';

class QuestionDashboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            paperData:{
                //studentId:null,
                paperList:[]
               
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
            paperList:[{
            examId:111,
              subject:'English',
             dept:'comp',
             year:'1'
            },
            {
               examId:222,
               subject:'Maths',
             dept:'comp',
             year:'1'
            }]
            };
            this.props.showLoading();
            // const url='http://slowwly.robertomurray.co.uk/delay/2000/url/https://jsonplaceholder.typicode.com/todos/1'
            // axios.get(config.serviceUrl + '/studentdata')
            //https://jsonplaceholder.typicode.com/todos/1?username=
            let geturl =('https://jsonplaceholder.typicode.com/todos/1?username='+this.state.username) ;
            console.log(geturl);
            axios.get(geturl)
            .then(response=>{
                response.data = sampleData;
                this.setState({paperData:response.data});
                this.props.hideLoading();
                this.props.paperDataLoaded(response.data);
            })
            .catch(error=>console.log(error));
        }
    }

    viewpaper(index){
        this.props.setPaper(this.state.paperData.paperList[index].examId);
        this.props.history.push('/teacher/questionpaper');
    }
    logout(){
        window.sessionStorage.setItem("sessionToken", null);
        window.sessionStorage.setItem("username", null);
        window.sessionStorage.setItem("userType", null);
        this.props.history.push('/login');
       }
       dash(){
        this.props.history.push('/teacher/dashboard');
       }
    // qpaper(){
    //     this.props.history.push('/teacher/questionpaper');
    //    }
    render(){
        const {paperList} = this.state.paperData;
        const{username}=this.state;
        console.log(this.state.paperData,'this is testlist');
        // console.log(username);
        return (
            <Container>
                <h1>Question Paper Dashboard</h1>
                {<div>
                     <div style={{'paddingTop':'30px'}}>
                    <Alert variant={'primary'} >
                        Username:{username}
                    </Alert>
                    </div>  
                    {paperList.length>0
                    ?   <div>
                            <Alert variant={'primary'}>Question Paper for you.</Alert>

                            {
                                paperList.map((paperList, index)=>{
                                    return <div>
                                        <Alert variant={'primary'}>
                                        <Row>
                                        <div style={{'paddingRight':'10px'}}> Exam Id: {paperList.examId}</div>
                                        </Row>
                                        <Row>
                                        <div>Subject: {paperList.subject}</div>
                                        </Row>
                                       <Row>
                                       <div>Year: {paperList.subject}</div>
                                       </Row>
                                       <Row>
                                       <div>Dept: {paperList.subject}</div>
                                       </Row>
                                        <Button variant="primary" onClick={()=>this.viewpaper(index)}>
                                            View
                                        </Button>
                                        </Alert>
                                    </div>
                                })
                            }

                            
                        </div>   
                    :   <Alert variant={'primary'}>
                            No question Papers
                        </Alert>
                    }
                </div>}
                <Button variant="primary" onClick={()=>this.logout()}>
                    Log Out
                </Button>
                <Button variant="primary" onClick={()=>this.dash()}>
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
        paperDataLoaded:(data)=>dispatch(actionCreator.paperDataLoaded(data)),
        setPaper:(data)=>dispatch(actionCreator.setPaper(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionDashboard);