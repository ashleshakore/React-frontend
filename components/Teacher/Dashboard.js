import React from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row, Form ,Card} from 'react-bootstrap';
import axios from 'axios';

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
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
    }
   
    CreateTest(){
        this.props.history.push('/teacher/addtest');
    }
    qpaper(){
        this.props.history.push('/teacher/paperlist');
    }
    EvaluateTest(){
        this.props.history.push('/teacher/evaluationDash');
    }
    logout(){
        window.sessionStorage.setItem("sessionToken", null);
        window.sessionStorage.setItem("username", null);
        window.sessionStorage.setItem("userType", null);
        this.props.history.push('/login');
       }
    render(){
        return (
            <Container>
               <h1 class="h2">Teacher Dashboard</h1>
                <div class="row" style={{alignContent: 'center', marginLeft: '10%', marginTop: '5%'}}>
                <Row>
                {/* <div  style={{'paddingTop':'150px','paddingRight':'50px'}}>
                <div class="card" style={{'height':'300px','width':'400px'}}>
                <div class="card-body">
                <h5 class="card-title" style={{'fontSize':'50px'}}>Create Test</h5>
                <div style={{'paddingBottom':'20px','paddingTop':'20px'}}>
                    <Button variant="primary" onClick={()=>this.CreateTest()}>Create Test</Button>
                </div>
                </div>
                </div>
                </div> */}
                 <div style={{'paddingRight':'300px'}}>
                <Card className="text-black #FFFFFF mb-3" style={{maxWidth: '18rem'}}>
                <Card style={{width: '18rem'}}>
                  <Card.Body>
                    <Card.Title>Create Test</Card.Title>
                    <Card.Text>Teacher can create test.</Card.Text>
                    <div style={{paddingBottom:'10px'}}>
                    <Button variant="primary" onClick={()=>this.CreateTest()}>Create Test</Button>
                    </div>
                   </Card.Body>
                </Card>
              </Card>
              </div>
                {/* <div style={{'paddingTop':'150px','paddingRight':'50px'}}>
                <div class="card" style={{'height':'300px','width':'400px'}}>
                <div class="card-body">
                <h5 class="card-title" style={{'fontSize':'50px'}}>Evaluate Test</h5>
                 <Button variant="primary" onClick={()=>this.EvaluateTest()}>Evaluate Test</Button>
                </div>
                </div>
                </div> */}
                <Card className="text-black #FFFFFF mb-3" style={{maxWidth: '18rem'}}>
                <Card style={{width: '18rem'}}>
                  <Card.Body>
                    <Card.Title>Evaluate Test</Card.Title>
                    <Card.Text>Admin has to add users as students and teachers</Card.Text>
                    <div style={{paddingBottom:'10px'}}>
                    <Button variant="primary" onClick={()=>this.EvaluateTest()}>Evaluate Test</Button>
                    </div>
                    <div style={{paddingBottom:'10px'}}>
                    <Button variant="primary" onClick={()=>this.qpaper()}>View Question Papers.</Button>
                    </div>
                   </Card.Body>
                </Card>
              </Card>
                </Row>
                </div>
                <Button variant="primary" onClick={()=>this.logout()}>
                    Log Out
                </Button>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);