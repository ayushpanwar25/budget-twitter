import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deletepost } from "../actions/posts";

function Confirmation(props) {

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Title id="example-modal-sizes-title-sm">
        Are you sure you want to delete this post?
      </Modal.Title>
      <Button variant="secondary" type="submit" style={{ backgroundColor: "red" }} onClick={() => { props.deletepost(props.postid); props.onHide() }}>Yes</Button>
      <Button variant="secondary" type="submit" onClick={() => props.onHide()}>Cancel</Button>
    </Modal >
  )
}

export default connect(null, { deletepost })(Confirmation);