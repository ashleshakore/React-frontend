import React from 'react';
import { Image, Modal, Button } from 'react-bootstrap';
import Webcam from 'react-webcam';

class WebcamModal extends React.Component{

    constructor(props){
        super(props);
        this.webcamRef = React.createRef();
        this.state = {
            capturedImages:[]
        }
    }

    captureImage(){
        let imagesrc = this.webcamRef.current.getScreenshot();
        let capturedImages = this.state.capturedImages;
        capturedImages.push(imagesrc);
        this.setState({capturedImages, captureFlag:true});
        this.props.addImage(imagesrc);
    }

    render(){
        return (
            <Modal show={this.props.show} onHide={()=>this.props.handleModalClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Capture Answers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Webcam
                        audio={false}
                        ref={this.webcamRef}
                        screenshotFormat="image/jpeg"
                        width={'450px'}
                    />
                </Modal.Body>
                <Modal.Footer>
                    {this.state.capturedImages.map(img=><Image width="100px" src={img}/>)}
                    <Button variant="secondary" onClick={()=>this.props.handleModalClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>this.captureImage()}>
                        Capture
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default WebcamModal;