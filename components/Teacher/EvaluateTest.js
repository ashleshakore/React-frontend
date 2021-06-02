import React from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row, Form } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config/config.json';
import * as loadingActionCreator from '../Loading/actions';

class EvaluateTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            examId:'',
            pdfUrl:null,
            objMarks:null,
            subMarks:null
        }
    }
    componentDidMount(){
        if(window.sessionStorage.getItem("sessionToken") == null){
            this.props.history.push('/login');
        } else if(window.sessionStorage.getItem("userType") != 'teacher'){
            window.sessionStorage.setItem("sessionToken", null);
            window.sessionStorage.setItem("username", null);
            window.sessionStorage.setItem("userType", null);
            this.props.history.push('/login');
        }
        //e.preventDefault();
        this.props.showLoading();
        const {username, examId} = this.state;
        
        let url = 'http://localhost:3001/pdf';
        let marksUrl = config.serviceUrl;
        // let url = `${config.serviceUrl}/fetchobjmarks?rollno=${rollNo}&examid=${examId}`;
        Promise.all([axios.get(url).then(res => {
            console.log("PDF Fetched ",res.data);
            const file = new Blob(
                [res.data], 
                {type: 'application/pdf'});
            this.setState({pdfUrl:URL.createObjectURL(file)});
        }).catch(err => {
            console.log(err);
        }), 
            axios.get(marksUrl).then(res => {
                console.log("Marks Fetched", res.data);
                res.data=60;
                this.setState({objMarks:res.data});
            }).catch(err => {
                console.log(err);
            })
        ]).then(()=>{
            this.props.hideLoading();
        });
    }
    // setRollNo(rollNo) {
    //     this.setState({rollNo});
    // }
    // setExamId(examId) {
    //     this.setState({examId});
    // }
    setSubMarks(subMarks) {
        this.setState({subMarks});
    }
    // validateForm(){
    //     return !(this.state.rollNo.length > 0 && this.state.examId.length > 0);
    // }
    validateSubmitForm(){
        return !(this.state.subMarks && this.state.subMarks.length > 0);
    }

    // fetchAnswerSheetAndMarks(e) {
        // e.preventDefault();
        // this.props.showLoading();
        // const {rollNo, examId} = this.state;
        
        // let url = 'http://localhost:3001/pdf';
        // let marksUrl = config.serviceUrl;
        // // let url = `${config.serviceUrl}/fetchobjmarks?rollno=${rollNo}&examid=${examId}`;
        // Promise.all([axios.get(url).then(res => {
        //     console.log("PDF Fetched ",res.data);
        //     const file = new Blob(
        //         [res.data], 
        //         {type: 'application/pdf'});
        //     this.setState({pdfUrl:URL.createObjectURL(file)});
        // }).catch(err => {
        //     console.log(err);
        // }), 
        //     axios.get(marksUrl).then(res => {
        //         console.log("Marks Fetched", res.data);
        //         res.data=60;
        //         this.setState({objMarks:res.data});
        //     }).catch(err => {
        //         console.log(err);
        //     })
        // ]).then(()=>{
        //     this.props.hideLoading();
        // });
    //};

    submitMarks(){
        this.props.showLoading();
        const {rollNo, examId, subMarks} = this.state;
        let data={
            rollNo,
            examId,
            subMarks
        }
        console.log(data);
        axios.post(config.serviceUrl + '/objmarks', data)
        .then(response => {
            console.log(response);
            this.props.hideLoading();
            this.props.history.push('/teacher/evaluationDash');
        }).catch(error=>{
            console.log(error);
            this.props.hideLoading();
        });
    }

    render(){
        const {rollNo, examId, pdfUrl, objMarks, subMarks,username} = this.state;
        return (
            <Container>
                <Row>
                    {/* <Col>
                        <Form onSubmit={(e)=>this.fetchAnswerSheetAndMarks(e)}>
                            <Form.Group as={Row} controlId="formBasicRollNo">
                                <Form.Label column>Roll No</Form.Label>
                                <Col>
                                    <Form.Control
                                        value={rollNo}
                                        onChange={(e) => this.setRollNo(e.target.value)}
                                        type="text" 
                                        placeholder="Roll No"
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formBasicExamId">
                                <Form.Label column>Exam Id</Form.Label>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Exam Id" 
                                        value={examId}
                                        onChange={(e) => this.setExamId(e.target.value)}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={this.validateForm()}>
                                Fetch
                            </Button>
                        </Form>
                    </Col> */}
                    <Col>
                        {objMarks && <div>
                        <Row>
                            <Col>
                            {<div>Objective Marks: {objMarks}</div>}
                            </Col>
                        </Row>
                        <Form.Group as={Row} controlId="formBasicRollNo">
                                <Form.Label column>Subjective Marks</Form.Label>
                                <Col>
                                    <Form.Control
                                        value={subMarks}
                                        onChange={(e) => this.setSubMarks(e.target.value)}
                                        type="text" 
                                        placeholder="Enter Subjective Marks here"
                                        required
                                    />
                                </Col>
                        </Form.Group>
                        <Row>
                            <Col>
                            Total:{objMarks && subMarks ? (objMarks+Number(subMarks)) : "Calc"} 
                            </Col>
                        </Row>
                        <Row>
                        <Button variant="primary" type="submit" onClick={()=>this.submitMarks()} disabled={this.validateSubmitForm()}>
                                Submit Marks
                            </Button>
                        </Row>
                        </div>}
                    </Col>
                </Row>
                <Row>
                    {pdfUrl && <iframe width={"100%"} height={"500px"} src={pdfUrl} />}
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (rootState) => {
    return {
        sessionToken: rootState.login.get('sessionToken')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showLoading:()=>dispatch(loadingActionCreator.showLoadingAction()),
        hideLoading:()=>dispatch(loadingActionCreator.hideLoadingAction())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EvaluateTest);