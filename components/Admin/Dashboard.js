import React from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row, Form, Card } from 'react-bootstrap';
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
        }
        else if(window.sessionStorage.getItem("userType") != 'admin'){
            window.sessionStorage.setItem("sessionToken", null);
            window.sessionStorage.setItem("username", null);
            window.sessionStorage.setItem("userType", null);
            this.props.history.push('/login');
        }
    }

    CreateStudent(){
        this.props.history.push('/admin/createstudent');
    }
    CreateTeacher(){
        this.props.history.push('/admin/createteacher');
    }
    DeleteStudent(){
        this.props.history.push('/admin/deletestudent');
    }
    DeleteTeacher(){
        this.props.history.push('/admin/deleteteacher');
    }
    logout(){
        window.sessionStorage.setItem("sessionToken", null);
        window.sessionStorage.setItem("username", null);
        window.sessionStorage.setItem("userType", null);
        this.props.history.push('/login');
       }
       ViewStudent(){
        this.props.history.push('/admin/studentlist');
       }
       ViewTeacher(){
        this.props.history.push('/admin/teacherlist');
       }
    //    handleClick(e) {
    //     e.preventDefault();
    //     window.sessionStorage.setItem("sessionToken", null);
    //     window.sessionStorage.setItem("username", null);
    //     window.sessionStorage.setItem("userType", null);
    //     this.props.history.push('/login');
    //   }
    render(){
        return (
            <Container>
                <nav class="navbar" style={{'width':'1100px','backgroundColor':'skyblue'}}>
                    <a class="navbar" style={{'fontFamily':'sans-serif-thin','fontSize':'30px','paddingLeft':'0px'}} >Online examination Website</a>
                </nav>
                <main role="main" style={{textAlign: 'center'}}>
                <h1 class="h2">Admin Dashboard</h1>
            <div class="row" style={{alignContent: 'center', marginLeft: '10%', marginTop: '5%'}}>
            <Col>
            <Card className="text-black #FFFFFF mb-3" style={{maxWidth: '18rem'}}>
                <Card style={{width: '18rem'}}>
                  <Card.Body>
                    <Card.Title>Create User</Card.Title>
                    <Card.Text>Admin has to add users as students and teachers</Card.Text>
                    <div style={{paddingBottom:'10px'}}>
                        <Button variant="primary" onClick={()=>this.CreateStudent()}>Create Student</Button>
                    </div>
                        <Button variant="primary" onClick={()=>this.CreateTeacher()}>Create Teacher</Button>
                   </Card.Body>
                </Card>
              </Card>
            </Col>
            <Col>
                <Card className="text-black #FFFFFF mb-3" style={{maxWidth: '18rem'}}>
                    <Card.Body>
                      <Card.Title>Delete user</Card.Title>
                      <Card.Text>Admin has to add users as students and teachers</Card.Text>
                      <div style={{paddingBottom: '10px'}}>
                        <Button variant="primary" onClick={()=>this.DeleteStudent()}>Delete Student</Button>
                      </div>
                      <div>
                        <Button variant="primary" onClick={()=>this.DeleteTeacher()}>Delete Teacher</Button>
                      </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
            <Card className="text-black #FFFFFF mb-3" style={{maxWidth: '18rem'}}>
                <Card style={{width: '18rem'}}>
                  <Card.Body>
                    <Card.Title>View User</Card.Title>
                    <Card.Text>Admin has to add users as students and teachers</Card.Text>
                    <div style={{paddingBottom:'10px'}}>
                        <Button variant="primary" onClick={()=>this.ViewStudent()}>View Student</Button>
                    </div>
                        <Button variant="primary" onClick={()=>this.ViewTeacher()}>View Teacher</Button>
                   </Card.Body>
                </Card>
              </Card>
            </Col>
                {/* <div class="col">
                  <div class="card text-black #FFFFFF mb-3" style={{maxWidth: '18rem', height: '14.2rem'}}>
                      <Card.Body>
                        <Card.Title>View user</Card.Title>
                        <Card.Text>Admin can view users list </Card.Text>
                        <div style={{paddingBottom: '10px', paddingTop: '20px'}}>
                          <button class="btn btn-primary">Click to view student list</button>
                        </div>
                        <div>
                          <button class="btn btn-primary">Click to view teacher list</button>
                        </div>
                      </Card.Body>
                    </div>
                  </div>
                   */}
                   </div>
                   <div style={{'paddingTop':''}}>
                   <Button variant="primary" onClick={()=>this.logout()}>
                    Log Out
                </Button>
                   </div>
                 
                  </main>
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