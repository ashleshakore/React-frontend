import React from 'react';
import {connect} from 'react-redux';
//import * as actionCreator from './actions';
import * as loadingActionCreator from '../Loading/actions';
import SubjectiveQ from './SubjectiveQ';
import { Button, Col, Container, Image, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import ObjectiveQ from './ObjectiveQ';
import Webcam from "react-webcam";
import config from '../../config/config.json';
import WebcamModal from './WebcamModal';

class TakeTest extends React.Component{
    constructor(props){
        super(props);
        this.count_vis = 0;
        // [{
        //     qNo:1,
        //     Ans:"B"
        // },
        // {
        //     qNo:2,
        //     Ans:"A"
        // }
        // ];
        this.state={
            notification:null,
            examId:0,
            subQList:[],
            objQList:[],
            subAns:[],
            objAns:[],
            username: sessionStorage.getItem('username'),
            capturedImages:[],
            captureFlag:false,
           
        }
    }

    

    submitAnswers(){
        this.props.showLoading();
        let retObjAnsArray = this.state.objAns.map((objans, index)=>{ 
          //  return {qNo:index+1, Ans:objans}
          return {Ans:objans}
        });
        let data = {
            objAns: retObjAnsArray,
            subAns: this.state.capturedImages,
            username:this.state.username,
            examId:this.state.examId
        }
        console.log(data);
        axios.post(config.serviceUrl + 'answers', data)
        .then(response => {
            console.log(response);
            this.setState({notification:"Success"});
            this.props.hideLoading();
            this.props.history.push('/student/dashboard');
        });
    }

    objAnsSelected(data){
        let objAns = this.state.objAns;
        objAns[data.index] = data.answer;
        this.setState({objAns});
    }

    addImage(img){
        let capturedImages = this.state.capturedImages;
        capturedImages.push(img);
        this.setState({capturedImages});
    }

    // componentWillUnmount() {
    //     window.removeEventListener("focus", this.onFocus)
    // }

    componentWillUnmount() {
        this.count_vis = 0;
    }

    componentDidMount() {

        if(window.sessionStorage.getItem("sessionToken") == null){
            this.props.history.push('/login');
        } else if(window.sessionStorage.getItem("userType") != 'student'){
            window.sessionStorage.setItem("sessionToken", null);
            window.sessionStorage.setItem("username", null);
            window.sessionStorage.setItem("userType", null);
            this.props.history.push('/login');
        }

        
        document.addEventListener("visibilitychange", ()=>{
             if(document.hidden){
                this.count_vis++;
                if(this.count_vis>='3' ){
                    if(this.count_vis==3){
                        alert('Do not switch Tab.This is last warning.');
                    }
                    else{
                        window.sessionStorage.setItem("sessionToken", null);
                        window.sessionStorage.setItem("username", null);
                        window.sessionStorage.setItem("userType", null);
                        this.props.history.push('/login');
                    }
                }
                else {
                     console.log(this.count_vis);
                     alert('Do not switch Tab.');
                }  
             }
         })

        this.props.showLoading();
        // const url='http://slowwly.robertomurray.co.uk/delay/2000/url/https://jsonplaceholder.typicode.com/todos/1'
        // axios.get(config.serviceUrl + '/studentdata')
         let sampleData = {
            examId:1,
            subQList:["QSample 1", "QSample 2"],
            objQList:[{
                q:"Example Question",
                options:["this", "that", "here", "there"]
            },
            {
                q:"Example Question No 2",
                options:["Option1", "Op2", "Op3", "OOPP4"]
            },
            {
                q:"Example Question No 2",
                options:["Option1", "Op2", "Op3", "OOPP4"]
            },
            {
                q:"Example Question No 2",
                options:["Option1", "Op2", "Op3", "OOPP4"]
            }]
        }
        let geturl = 'https://jsonplaceholder.typicode.com/todos/1?examId='+this.props.examId;
        console.log("getUrl", geturl);
        axios.get(geturl)
        .then(response=>{
            response.data = sampleData;
            this.setState({examId:response.data.examId,
                subQList:response.data.subQList,
                objQList:response.data.objQList,
            });
            this.props.hideLoading();
        })
        .catch(error=>console.log(error));
    }

    toggleWebcam(flag){
        this.setState({captureFlag:flag});
    }

    render(){
        const {notification, subQList, objQList} = this.state
        return (
            <Container>
                <div style={{'paddingTop':'30px'}}>
                    <Alert variant={'primary'} >
                    <Row>Exam Id: {this.props.examId}</Row>
                <Row>Student Id: {this.props.studentId}</Row>
                    </Alert>
                    </div>
                
                {notification ? <Row>{notification}</Row> : <div></div>}
                <Row>
                    <Col>
                        <div id="Test">
                        {objQList.map((element, index)=>
                            <ObjectiveQ key={`obj${index}`} q={element} qNo={index} objAns={(index, answer)=>this.objAnsSelected({index, answer})}></ObjectiveQ>
                        )}
                        </div>
                    </Col>
                    <Col>
                        <div id="Test">
                        {subQList.map((element, index)=>
                            // <SubjectiveQ key={`sub${index}`} q={element} qNo={index} subAns={(index, answer)=>this.subAnsSelected({index, answer})}></SubjectiveQ>
                            <SubjectiveQ key={`sub${index}`} q={element} qNo={index} ></SubjectiveQ>
                        )}
                        {this.state.capturedImages.length>0 && 
                            <div>{
                                this.state.capturedImages.map((imageT)=>{
                                    return <Image width='100px' src={imageT}></Image>
                                })
                            }
                        </div>}
                        <Button variant="primary" onClick={()=>this.toggleWebcam(true)}>
                            {"Start WebCam"}
                        </Button>
                        </div>
                    </Col>
                </Row>
                <Button variant="primary" onClick={()=>this.submitAnswers()}>
                    Submit Answers
                </Button>
                <WebcamModal handleModalClose={()=>this.toggleWebcam(false)} addImage={(img)=>this.addImage(img)} show={this.state.captureFlag}/>
            </Container>
        );
    }
}

const mapStateToProps = (rootState) => {
    return {
        isLoading: rootState.loading.get('isLoading'),
        studentId: rootState.student.get('studentId'),
        examId: rootState.student.get('examId')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showLoading:()=>dispatch(loadingActionCreator.showLoadingAction()),
        hideLoading:()=>dispatch(loadingActionCreator.hideLoadingAction())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TakeTest);