import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

class ObjectiveQ extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            checkedIndex:null
        }
    }

    toggleCheckbox(el, checkedIndex){
        this.setState({checkedIndex});
        this.props.objAns(this.props.qNo, checkedIndex);
    }

    render(){
        return (
            <Row>
                <Col sm={10}>
                    <Row className="font-weight-bold">
                        {`Q ${this.props.qNo + 1}`}) {this.props.q.q}
                    </Row>
                    <Form>
                        {this.props.q.options.map((el, index)=>{
                            return <Row key={`option${index}`}><Form.Check
                                label={el}
                                type={'checkbox'}
                                checked={this.state.checkedIndex===index}
                                onChange={(e)=>this.toggleCheckbox(e, index)}
                            /></Row>
                        })}
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default ObjectiveQ;