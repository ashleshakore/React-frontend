import React from "react";
import {connect} from "react-redux";
import {Modal} from "react-bootstrap";

export class Loading extends React.Component {
    render() {
        return (
            <Modal show={this.props.isLoading} onHide={()=>console.log('Modal Closing')}>
                <Modal.Body>Please Wait...</Modal.Body>
            </Modal>
        );
    }
}

export const mapStateToProps = (rootState) => {
    return {
        isLoading: rootState.loading.get("isLoading")
    }
};

export default connect(mapStateToProps)(Loading);