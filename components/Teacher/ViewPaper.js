import React from 'react';
import {connect} from 'react-redux';
//import * as actionCreator from './actions';
import * as loadingActionCreator from '../Loading/actions';
import SubjectiveQ from './SubjectiveQ';
import { Button, Col, Container, Image, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import ObjectiveQ from './ObjectiveQ';


class ViewPaper extends React.Component{
    constructor(props){
        super(props);
        // [{
        //     qNo:1,
        //     ans:"B"
        // },
        // {
        //     qNo:2,
        //     ans:"A"
        // }
        // ];
        this.state={
            notification:null,
            examId:0,
            subject:null,
            subjQList:[],
            objeQList:[],
            username: sessionStorage.getItem('username')
        }
    }

    componentDidMount() {

        if(window.sessionStorage.getItem("sessionToken") == null){
            this.props.history.push('/login');
        } else if(window.sessionStorage.getItem("userType") != 'teacher'){
            window.sessionStorage.setItem("sessionToken", null);
            window.sessionStorage.setItem("username", null);
            window.sessionStorage.setItem("userType", null);
            this.props.history.push('/login');
        }

        this.props.showLoading();
        // const url='http://slowwly.robertomurray.co.uk/delay/2000/url/https://jsonplaceholder.typicode.com/todos/1'
        // axios.get(config.serviceUrl + '/studentdata')
        let sample = 
            {111:{
                examId:111,
                subject:'english',
                subjQList:[{
                    q:"QSample 1",
                    m:'2'
                }, 
                {
                    q:"QSample 2",
                    m:'3'
                }],
                objeQList:[{
                    q:"Example Question",
                    options:["this", "that", "here", "there"],
                    ans:'a',
                    marks:'5'
                },
                {
                    q:"Example Question No 2",
                    options:["Option1", "Op2", "Op3", "OOPP4"],
                    ans:'a',
                    marks:'5'
                },
                {
                    q:"Example Question No 2",
                    options:["Option1", "Op2", "Op3", "OOPP4"],
                    ans:'a',
                    marks:'5'
                },
                {
                    q:"Example Question No 2",
                    options:["Option1", "Op2", "Op3", "OOPP4"],
                    ans:'a',
                    marks:'5'
                }]
            },
            222:{
                examId:222,
                subject:'Physics',
                subjQList:[{
                    q:"QSamplePhy 1",
                    m:'2'
                }, 
                {
                    q:"QSamplePhy 2",
                    m:'3'
                }],
                objeQList:[{
                    q:"Example Question Phy",
                    options:["this", "that", "here", "there"],
                    ans:'a',
                    marks:'5'
                },
                {
                    q:"Example Question  PHY No 2",
                    options:["Option1", "Op2", "Op3", "OOPP4"],
                    ans:'a',
                    marks:'5'
                },
                {
                    q:"Example Question No 2",
                    options:["Option1", "Op2", "Op3", "OOPP4"],
                    ans:'a',
                    marks:'5'
                },
                {
                    q:"Example Question No PHY 2",
                    options:["Option1", "Op2", "Op3", "OOPP4"],
                    ans:'a',
                    marks:'5'
                }]
            }
            }
        let geturl = 'https://jsonplaceholder.typicode.com/todos/1?examId='+this.props.examId;
        console.log("getUrl", geturl);
        axios.get(geturl)
        .then(response=>{
            response.data = sample[this.props.examId];
            console.log(response.data)
            this.setState({
                examId:response.data.examId,
                subjQList:response.data.subjQList,
                objeQList:response.data.objeQList,
                subject:response.data.subject
            });
            this.props.hideLoading();
        })
        .catch(error=>console.log(error));
    }

    
    gotoquestionlist(){
        this.props.history.push('/teacher/paperlist');
    }
    render(){
        const {notification, subjQList, objeQList,subject,examId} = this.state
        return (
            <Container>
                <div style={{'paddingTop':'30px'}}>
                    <Alert variant={'primary'} >
                    <Row>Exam Id: {examId}</Row>
                <Row>Subject: {subject}</Row>
                    </Alert>
                    </div>
                
                {notification ? <Row>{notification}</Row> : <div></div>}
                <Row>
                    <Col>
                        <div id="Test">
                        {objeQList.map((element, index)=>
                            <ObjectiveQ key={`obj${index}`} q={element} qNo={index} isViewMode={true}></ObjectiveQ>
                        )}
                        </div>
                    </Col>
                    <Col>
                        <div id="Test">
                        {subjQList.map((element, index)=>
                            // <SubjectiveQ key={`sub${index}`} q={element} qNo={index} subAns={(index, answer)=>this.subAnsSelected({index, answer})}></SubjectiveQ>
                            <SubjectiveQ key={`sub${index}`} q={element} qNo={index} isViewMode={true}></SubjectiveQ>
                        )}
                        {/* {this.state.capturedImages.length>0 && 
                            <div>{
                                this.state.capturedImages.map((imageT)=>{
                                    return <Image width='100px' src={imageT}></Image>
                                })
                            }
                        </div>} */}
                        {/* <Button variant="primary" onClick={()=>this.toggleWebcam(true)}>
                            {"Start WebCam"}
                        </Button> */}
                        </div>
                    </Col>
                </Row>
                <Button variant="primary" onClick={()=>this.gotoquestionlist()}>
                    Go back
                </Button>
                {/* <WebcamModal handleModalClose={()=>this.toggleWebcam(false)} addImage={(img)=>this.addImage(img)} show={this.state.captureFlag}/> */}
            </Container>
        );
    }
}

const mapStateToProps = (rootState) => {
    return {
        isLoading: rootState.loading.get('isLoading'),
        examId: rootState.teacher.get('examId')
       // studentId: rootState.student.get('studentId'),
       // examId: rootState.teacher.get('examId')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showLoading:()=>dispatch(loadingActionCreator.showLoadingAction()),
        hideLoading:()=>dispatch(loadingActionCreator.hideLoadingAction())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewPaper);