import { React, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { editpost } from "../actions/posts";

function EditPost(props) {

  const [text, setText] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    props.editpost(props.post.id, text);
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Title id="example-modal-sizes-title-sm">
        Edit Post
      </Modal.Title>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea" rows={5}
            type="text"
            placeholder="What's on your mind?"
            defaultValue={props.post.text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off" />
          <Button variant="secondary" type="submit">&quot;Tweet&quot;</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )

}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { editpost })(EditPost);