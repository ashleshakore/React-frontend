import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from './actions';
import * as loadingActionCreator from '../Loading/actions';
import Button from 'react-bootstrap/Button';
import { Container, Alert, Row } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config/config.json';

class TeacherList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            teacherData:{
                //studentId:null,
                teacherList:[]
               
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
            //username:'ash',
            teacherList:[{
             username:'xyz',
             password:'xyz'
            },
            {
                username:'x',
                password:'xyz'
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
                this.setState({resultData:response.data});
                this.props.hideLoading();
                this.props. teacherListLoaded(response.data);
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
        const { teacherList} = this.state. teacherData;
        const{username}=this.state;
        //console.log(this.state.resultData,'this is resultlist');
        // console.log(username);
        return (
            <Container>
                <h1>Result Dashboard</h1>
                {<div>
                     <div style={{'paddingTop':'30px'}}>
                    <Alert variant={'primary'} >
                        Student Id:{username}
                    </Alert>
                    </div>  
                    { teacherList.length>0
                    ?   <div>
                            <Alert variant={'primary'}>Test Scheduled for you.</Alert>

                            {
                                 teacherList.map(( teacherList, index)=>{
                                    return <div>
                                        <Alert variant={'primary'}>
                                        <Row> <div>Username : { teacherList.examId}</div></Row>
                                        <Row>
                                        <div> Password :{ teacherList.password}</div>
                                        </Row>
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
        teacherListLoaded:(data)=>dispatch(actionCreator.teacherListLoaded(data))
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TeacherList);