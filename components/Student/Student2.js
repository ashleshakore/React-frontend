import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from './actions';
import * as loadingActionCreator from '../Loading/actions';
import Button from 'react-bootstrap/Button';
import { Container, Alert, Tab, Col, Row, Nav } from 'react-bootstrap';
import axios from 'axios';

class Student extends React.Component{

    constructor(props){
        super(props);
        this.state={
            studentData:{
                studentId:null,
                testList:[]
            }
        }
    }

    componentDidMount() {
        let sampleData={
            studentId:1234,
            testList:[{
                examId:111,
                subject:'English',
                taken:true
            },
            {
                examId:222,
                subject:'Maths',
                taken:false
            }]
        };
        this.props.showLoading();
        // const url='http://slowwly.robertomurray.co.uk/delay/2000/url/https://jsonplaceholder.typicode.com/todos/1'
        // axios.get(config.serviceUrl + '/studentdata')
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(response=>{
            response.data = sampleData;
            this.setState({studentData:response.data});
            this.props.hideLoading();
            this.props.studentDataLoaded(response.data);
        })
        .catch(error=>console.log(error));
    }

    takeTest(index){
        this.props.setTest(this.state.studentData.testList[index].examId);
        this.props.history.push('/student/test');
    }

    render(){
        const {testList,studentId} = this.state.studentData;
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
                        <Tab.Pane eventKey="second">
                            <Container>
                            {<div>
                                <Alert variant={'primary'}>
                                    Student Id:{studentId}
                                </Alert>
                                {testList.length>0
                                ?   <div>
                                        <Alert variant={'primary'}>Test Scheduled for you.</Alert>

                                        {
                                            testList.map((test, index)=>{
                                                return <div>
                                                    Exam Id: {test.examId}
                                                    Subject: {test.subject}
                                                    <Button variant="primary" onClick={()=>this.takeTest(index)}>
                                                        Take Test
                                                    </Button>
                                                </div>
                                            })
                                        }
                                    </div>   
                                :   <Alert variant={'primary'}>
                                        Test Not Scheduled for you yet
                                    </Alert>
                                }
                                </div>}
                            </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            Exams Scheduled Component
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
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