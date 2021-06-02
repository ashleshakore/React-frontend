import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';

class SubjectiveQ extends React.Component{
    render(){
        return (
            <Row>
                <Col sm={10}>
                    <Row>
                    {`Q ${this.props.qNo + 1}`}) {this.props.q.q}
                    </Row>
                    <Row>{'marks: '}{this.props.q.m}</Row>
                </Col>
                {this.props.isViewMode ? <div/> : <Col sm={1}>
                    <Row style={{'paddingTop': '5px','paddingBottom':'5px'}}>
                        <Button onClick={()=>this.props.remFunc(this.props.qNo)}>
                            Remove
                        </Button>
                    </Row>
                </Col>}
            </Row>
        );
    }
}

export default SubjectiveQ;