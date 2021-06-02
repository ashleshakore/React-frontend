import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from './actions';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row, Form ,Alert} from 'react-bootstrap';
import SubjectiveQ from './SubjectiveQ';
import ObjectiveQ from './ObjectiveQ';
import axios from 'axios';
import config from '../../config/config.json'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

class AddTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            subQ:'',
            objQ:'',
            op1:'',
            op2:'',
            op3:'',
            op4:'',
            opc:'',
            success:false,
            ExamId:'',
            subject:'',
            error:'',
            markSub:'',
            markObj:'',
            year:'',
            dept:'',
            fromDate: new Date(),
            toDate: new Date(),
            username: sessionStorage.getItem('username'),
            SubQno:'',
            ObjQno:''
        }
    }
    setsubQ(subQ) {
        this.setState({subQ});
    }
    setObjQ(objQ) {
        this.setState({objQ});
    }
    setmarkSub(markSub) {
       this.setState({markSub});
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
}

    submitSubQ() {
        if(this.state.subQ.length<=0 || this.state.markSub.length<=0){
            this.setState({error:'Please enter Question text'});
        } else {
            this.props.subQAdded({q:this.state.subQ , m:this.state.markSub});
            this.setState({subQ:'', markSub:'',error:''});
        }
    }
    submitObjQ() {
        if(this.state.objQ.length<=0 || this.state.op1.length<=0 || this.state.op2.length<=0 || this.state.op3.length<=0 || this.state.op4.length<=0 ||this.state.opc.length<=0||this.state.markObj.length<=0){
            this.setState({error:"Please enter Question and 5 options and marks"})
        } else {
            this.props.objQAdded({
                q:this.state.objQ,
                options:[this.state.op1,this.state.op2,this.state.op3,this.state.op4],
                ans:this.state.opc,
                marks:this.state.markObj
            });
            this.setState({
                objQ:'',
                op1:'',
                op2:'',
                op3:'',
                op4:'',
                opc:'',
                error:'',
                markObj:''
            });
        }
    }
    setYear(year) {
        this.setState({year});
    }
    setdept(dept) {
        this.setState({dept});
    }
    setExamId(ExamId) {
        this.setState({ExamId});
    }
    setsubject(subject) {
        this.setState({subject});
    }
   
    setMarkObj(markObj) {
        this.setState({markObj});
    }
    setOp1(op) {
        this.setState({op1:op});
    }
    setOp2(op) {
        this.setState({op2:op});
    }
    setOp3(op) {
        this.setState({op3:op});
    }
    setOp4(op) {
        this.setState({op4:op});
    }
    setOpc(op) {
        this.setState({opc:op});
    }
    removeObjQ = (qNo) => {
        console.log("Remove Called ",qNo );
        this.props.deleteObjQ(qNo);
    }
    removeSubQ = (qNo) => {
        this.props.deleteSubQ(qNo);
    }

    submitQPaper(){
        if((this.props.objQList.size>0 || this.props.subQList.size>0) && this.state.ExamId.length>0 &&  this.state.subject.length>0 && this.state.year.length>0 && this.state.dept.length>0){
            this.setState({error:""});
            const data = { 
                SubQno:this.props.subQList.size,
                ObjQno:this.props.objQList.size,
                username:this.state.username,
                objQList:this.props.objQList, 
                subQList:this.props.subQList, 
                ExamId:this.state.ExamId,
                subject:this.state.subject, 
                year:this.state.year, 
                dept:this.state.dept, 
                fromDate:this.state.fromDate.toISOString(),
                toDate:this.state.toDate.toISOString()};
            axios.post(config.serviceUrl + '/questionpaper', data)
                .then(response => { console.log(response); this.setState({ success: true })});
         this.props.history.push('/teacher/dashboard');
        } else {
            this.setState({error:"Please enter the required data"});
        }
    }

    fromDateChanged(date){
        this.setState({fromDate:date})
    }

    toDateChanged(date){
        this.setState({toDate:date})
    }

    render(){    
        return (
            <Container>
                <h1 style={{'paddingBottom':'50px','paddingTop':'10px'}}>Create Test</h1>
                {this.state.success?<div style={{'color':'green','fontWeight':'bold'}}>SUCCESS !</div>:<div></div>}
                {this.state.error.length>0?<div style={{'color':'red','fontWeight':'bold'}}>{this.state.error}</div>:<div></div>}
                <Row>
                <Form.Label style={{'fontSize':'25px','paddingRight':'150px'}}>Exam Id</Form.Label>
                <Form.Control
                    style={{'width': '150px'}}
                    value={this.state.batchId}
                    onChange={(e) => this.setExamId(e.target.value)}
                    className={"invalid"}
                />
                <Form.Label style={{'fontSize':'25px','paddingRight':'95px','paddingLeft':'180px'}}>Subject Code</Form.Label>
                <Form.Control
                    style={{'width': '150px'}}
                    value={this.state.subject}
                    onChange={(e) => this.setsubject(e.target.value)}
                    className={"invalid"}
                />
                 </Row>
                 <Row>
                <Form.Label style={{'fontSize':'25px','paddingRight':'194px'}}>Year</Form.Label>
                <Form.Control
                    style={{'width': '150px'}}
                    value={this.state.year}
                    onChange={(e) => this.setYear(e.target.value)}
                    className={"invalid"}
                />
                <Form.Label style={{'fontSize':'25px','paddingRight':'109px','paddingLeft':'180px'}}>Department</Form.Label>
                <Form.Control
                    style={{'width': '150px'}}
                    value={this.state.dept}
                    onChange={(e) => this.setdept(e.target.value)}
                    className={"invalid"}
                />
                <div><br/>Test Valid From: <Datetime value={this.state.fromDate} onChange={(date)=>this.fromDateChanged(date)}/>
                Test Valid To: <Datetime value={this.state.toDate} onChange={(date)=>this.toDateChanged(date)}/>
                </div>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Form style={{'paddingBottom':'20px','paddingRight':'20px','paddingTop':'20px','fontSize':'20px','border':'10px'}}>
                            <Form.Group controlId="formBasicSubQ" style={{'paddingTop':'15px'}}>
                                <Form.Label>Subjective Question No {this.props.subQList.size+1}</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    value={this.state.subQ}
                                    onChange={(e) => this.setsubQ(e.target.value)}
                                />
                               <Form.Control 
                                    required
                                    type="number"
                                    placeholder="marks for this question" 
                                    value={this.state.markSub}
                                    onChange={(e) => this.setmarkSub(e.target.value)}  
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={()=>this.submitSubQ()}>
                                Add Question
                            </Button>
                            <Form.Group controlId="formBasicObjQ" style={{'paddingTop':'30px'}}>
                                <Form.Label>Objective Question No {this.props.objQList.size+1}</Form.Label>
                                <Form.Control as="textarea" rows={1}
                                    value={this.state.objQ}
                                    onChange={(e) => this.setObjQ(e.target.value)}
                                />
                                <Form.Label>Options</Form.Label>
                                <Form.Control 
                                    required
                                    type="text"
                                    placeholder="Option A" 
                                    value={this.state.op1}
                                    onChange={(e) => this.setOp1(e.target.value)}
                                />
                                <Form.Control 
                                    placeholder="Option B" 
                                    value={this.state.op2}
                                    onChange={(e) => this.setOp2(e.target.value)}
                                />
                                <Form.Control 
                                    placeholder="Option C" 
                                    value={this.state.op3}
                                    onChange={(e) => this.setOp3(e.target.value)}
                                />
                                <Form.Control 
                                    placeholder="Option D" 
                                    value={this.state.op4}
                                    onChange={(e) => this.setOp4(e.target.value)}
                                />
                                <Form.Control 
                                    placeholder="Correct Option" 
                                    value={this.state.opc}
                                    onChange={(e) => this.setOpc(e.target.value)}
                                />
                                <Form.Control 
                                    required
                                    type="number"
                                    placeholder="marks for this question" 
                                    value={this.state.markObj}
                                    onChange={(e) => this.setMarkObj(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={()=>this.submitObjQ()}>
                                Add Question
                            </Button>
                        </Form>
                        <Button variant="primary" onClick={()=>this.submitQPaper()} >
                                Submit All Questions
                        </Button>
                    </Col>
                    <Col sm={8} style={{'overflowY': 'auto','height': '500px','fontSize':'25px','paddingTop':'30px'}}>
                        <Row>Subjective Questions</Row>  
                        {this.props.subQList.map((element, index)=>
                            <SubjectiveQ q={element} qNo={index} remFunc={this.removeSubQ}></SubjectiveQ>
                        )}
                        <hr></hr>
                        <Row>Objective Questions</Row>
                        {this.props.objQList.map((element, index)=>
                            <ObjectiveQ q={element} qNo={index} remFunc={this.removeObjQ}></ObjectiveQ>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (rootState) => {
    return {
        subQList: rootState.teacher.get('subQList'),
        objQList: rootState.teacher.get('objQList'),
        userName: rootState.login.get('userName')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        objQAdded:(q)=>dispatch(actionCreator.objQAdded(q)),
        subQAdded:(q)=>dispatch(actionCreator.subQAdded(q)),
        deleteObjQ:(qNo)=>dispatch(actionCreator.deleteObjQ(qNo)),
        deleteSubQ:(qNo)=>dispatch(actionCreator.deleteSubQ(qNo)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTest);