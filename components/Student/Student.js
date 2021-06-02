import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from './actions';
import * as loadingActionCreator from '../Loading/actions';
import Button from 'react-bootstrap/Button';
import { Container, Alert, Row,Col,Nav,Tab } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config/config.json';

class Student extends React.Component{

    constructor(props){
        super(props);
        this.state={
            studentData:{
                //studentId:null,
                testList:[]
               
            },
            resultData:{
                //studentId:null,
                resultList:[]
               
            },
            username: sessionStorage.getItem("username")
        }
    }

    componentDidMount() {
        if(window.sessionStorage.getItem("sessionToken") == null){
            this.props.history.push('/login');
        }
        else if (window.sessionStorage.getItem("userType") != 'student'){
                window.sessionStorage.setItem("sessionToken", null);
                window.sessionStorage.setItem("username", null);
                window.sessionStorage.setItem("userType", null);
                this.props.history.push('/login');
            }
        else
        {
            let sampleData={
            //username:'ash',
            testList:[{
            examId:111,
              subject:'English',
             exam_open:'2021-05-20T15:55:37.593Z',
             exam_close:'2021-05-06T15:55:37.593Z'
            },
            {
               examId:222,
               subject:'Maths',
               exam_open:'2021-05-20T15:55:37.593Z',
               exam_close:'2021-05-06T15:55:37.593Z'
            }]
            };
            let sampleData2={
                //username:'ash',
                resultList:[{
                examId:111,
                submarks:'60',
                objmarks:'0',
                total:'60'
                },
                {
                   examId:222,
                   submarks:'62',
                   objmarks:'16',
                   total:'72'
                }]
                };
            this.props.showLoading();
            // const url='http://slowwly.robertomurray.co.uk/delay/2000/url/https://jsonplaceholder.typicode.com/todos/1'
            // axios.get(config.serviceUrl + '/studentdata')
            //https://jsonplaceholder.typicode.com/todos/1?username=
            let geturl =('https://jsonplaceholder.typicode.com/todos/1?username='+this.state.username) ;
            let get2 =('https://jsonplaceholder.typicode.com/todos/1?username='+this.state.username) ;
            console.log(geturl);
            axios.get(geturl)
            .then(response=>{
                response.data = sampleData;
                this.setState({studentData:response.data});
                this.props.hideLoading();
                this.props.studentDataLoaded(response.data);
            })
            .catch(error=>console.log(error));
            axios.get(get2)
            .then(response=>{
                response.data = sampleData2;
                this.setState({resultData:response.data});
                this.props.hideLoading();
                this.props.resultDataLoaded(response.data);
            })
            .catch(error=>console.log(error));
        }
    }
    
    takeTest(index){
        this.props.setTest(this.state.studentData.testList[index].examId);
        this.props.history.push('/student/test');
    }
    logout(){
        window.sessionStorage.setItem("sessionToken", null);
        window.sessionStorage.setItem("username", null);
        window.sessionStorage.setItem("userType", null);
        this.props.history.push('/login');
       }
    result(){
        this.props.history.push('/student/result');
       }
    render(){
        const {testList} = this.state.studentData;
        const {resultList} = this.state.resultData;
        const{username}=this.state;
        console.log(this.state.studentData,'this is testlist');
        // console.log(username);
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first">Instructions</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Results</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="third">Exams Scheduled</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            Instructions Component
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                        <Container>
                <h1>Student Dashboard</h1>
                {<div>
                     <div style={{'paddingTop':'30px'}}>
                    <Alert variant={'primary'} >
                        Student Id:{username}
                    </Alert>
                    </div>  
                    {testList.length>0
                    ?   <div>
                            <Alert variant={'primary'}>Test Scheduled for you.</Alert>

                            {
                                testList.map((testList, index)=>{
                                    return <div>
                                        <Alert variant={'primary'}>
                                        <Row>
                                        <div style={{'paddingRight':'10px'}}> Exam Id: {testList.examId}</div>
                                        <div>Subject: {testList.subject}</div>
                                        
                                        </Row>
                                       <Row>
                                           <div style={{'paddingRight':'10px'}}>Exam Open:{testList.exam_open}</div>
                                       
                                        Exam Close:{testList.exam_close}
                                       </Row>
                                        <Button variant="primary" onClick={()=>this.takeTest(index)}>
                                            Take Test
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
            </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                        <Container>
                <h1>Result Dashboard</h1>
                {<div>
                     <div style={{'paddingTop':'30px'}}>
                    <Alert variant={'primary'} >
                        Student Id:{username}
                    </Alert>
                    </div>  
                    {resultList.length>0
                    ?   <div>
                            <Alert variant={'primary'}>Results</Alert>

                            {
                                resultList.map((resultList, index)=>{
                                    return <div>
                                        <Alert variant={'primary'}>
                                        <Row> <div>Exam Id: {resultList.examId}</div></Row>
                                        <Row>
                                        <div> Objective Marks {resultList.objmarks}</div>
                                        </Row>
                                       <Row><div>Subjective marks: {resultList.submarks}</div></Row>
                                       <Row> <div>Total marks: {resultList.total}</div></Row>
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
                {/* <Button variant="primary" onClick={()=>this.gotodash()}>
                    Go to Dashboard
                </Button> */}
                <Button variant="primary" onClick={()=>this.logout()}>
                    Log Out
                </Button>
            </Container>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
            // <Container>
            //     <h1>Student Dashboard</h1>
            //     {<div>
            //          <div style={{'paddingTop':'30px'}}>
            //         <Alert variant={'primary'} >
            //             Student Id:{username}
            //         </Alert>
            //         </div>  
            //         {testList.length>0
            //         ?   <div>
            //                 <Alert variant={'primary'}>Test Scheduled for you.</Alert>

            //                 {
            //                     testList.map((testList, index)=>{
            //                         return <div>
            //                             <Alert variant={'primary'}>
            //                             <Row>
            //                             <div style={{'paddingRight':'10px'}}> Exam Id: {testList.examId}</div>
            //                             <div>Subject: {testList.subject}</div>
                                        
            //                             </Row>
            //                            <Row>
            //                                <div style={{'paddingRight':'10px'}}>Exam Open:{testList.exam_open}</div>
                                       
            //                             Exam Close:{testList.exam_close}
            //                            </Row>
            //                             <Button variant="primary" onClick={()=>this.takeTest(index)}>
            //                                 Take Test
            //                             </Button>
            //                             </Alert>
            //                         </div>
            //                     })
            //                 }

                            
            //             </div>   
            //         :   <Alert variant={'primary'}>
            //                 Test Not Scheduled for you yet
            //             </Alert>
            //         }
            //     </div>}
            //     <Button variant="primary" onClick={()=>this.result()}>
            //         Results
            //     </Button>
            //     <Button variant="primary" onClick={()=>this.logout()}>
            //         Log Out
            //     </Button>
            // </Container>
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
        studentDataLoaded:(data)=>dispatch(actionCreator.studentDataLoaded(data)),
        setTest:(data)=>dispatch(actionCreator.setTest(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Student);