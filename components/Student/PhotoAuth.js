import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from './actions';
import * as loadingActionCreator from '../Loading/actions';
import Button from 'react-bootstrap/Button';
import { Alert, Container, Image, Row} from 'react-bootstrap';
import axios from 'axios';
import config from '../../config/config.json';
import Webcam from 'react-webcam';

class PhotoAuth extends React.Component{
    constructor(props){
        super(props);
        this.photoAuthRef = React.createRef();
        this.state={
            notification:null,
            webcamStarted:false,
            photoAuthImage:null,
            username:window.sessionStorage.getItem("username")
        }
    }
    componentDidMount() {
        if(window.sessionStorage.getItem("sessionToken") == null){
            this.props.history.push('/login');
        }
        else if (window.sessionStorage.getItem("userType") != 'student'){
                this.props.history.push('/login');
        }
        window.sessionStorage.setItem("photoToken", null);
    }
    startWebcam(){
        this.setState({webcamStarted:true});
    }
    stopWebcam(){
        this.setState({webcamStarted:false});
    }
    captureImage(){
        let photoAuthImage = this.photoAuthRef.current.getScreenshot();
        this.setState({photoAuthImage});
    }
    submitImage(){
        this.stopWebcam()
        this.props.showLoading();
        let data = {
            username:this.state.username,
            imageData:this.state.photoAuthImage
        }
        //console.log(data);
        axios.post(config.serviceUrl + 'photoauth', data)
        .then(response => {
            //console.log(response);
            // Dummy data
            response = {
                data: {
                    success: true,
                    photoToken: "samplePhototoken"
                }
            }
            if(response.data.success){
                this.setState({notification:"Success"});
                window.sessionStorage.setItem("photoToken", response.data.photoToken);
                this.props.hideLoading();
                this.props.history.push('/student/dashboard');
            } else {
                this.setState({notification:"Failed Photo Auth. Please try again"});
                window.sessionStorage.setItem("photoToken", null);
                this.props.hideLoading();
            }
        });
    }

    render(){
        let {webcamStarted, photoAuthImage, notification, username} = this.state;
        return (
            <Container>
                {notification && <Alert variant={'danger'}>{notification}</Alert>}
                <h1>Photo Authentication</h1>
                <Alert variant={'info'}>Username:{username}</Alert>
                <Row>
                    {!webcamStarted ? <Button variant="primary" onClick={()=>this.startWebcam()}>Start Webcam for Photo Auth</Button>
                    : <Button variant="primary" onClick={()=>this.stopWebcam()}>Stop Webcam</Button>}
                </Row>
                {webcamStarted && <div style={{'paddingLeft':'450px','paddingBottom':'20px'}}><Row>
                    <Webcam
                        audio={false}
                        ref={this.photoAuthRef}
                        screenshotFormat="image/jpeg"
                        width={'350px'}
                        height={'350px'}
                    />
                </Row></div>}
                {webcamStarted && <div style={{'paddingLeft':'50px'}}><Button variant="primary" onClick={()=>this.captureImage()}>Capture Image</Button></div>}
                {photoAuthImage && <div style={{'paddingLeft':'50px'}}><Row>
                    <div style={{'paddingLeft':'400px','paddingBottom':'20px'}}><Image width="350px" height="350px" src={photoAuthImage}/></div></Row>
                    <Row><Button variant="primary" onClick={()=>this.submitImage()}>Submit</Button></Row>
                </div>}
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
        hideLoading:()=>dispatch(loadingActionCreator.hideLoadingAction())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PhotoAuth);