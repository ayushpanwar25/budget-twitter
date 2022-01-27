import { React, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { create } from "../actions/posts";

function CreatePost(props) {

  const [text, setText] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const { id, username } = props.user;
    const newPost = { username, id, text };
    props.create(newPost);
    setText('');
    props.onHide();
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
        Create Post
      </Modal.Title>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea" rows={5}
            type="text"
            placeholder="What's on your mind?"
            defaultValue={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off" />
          <Button variant="secondary" type="submit">&quot;Tweet&quot;</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { create })(CreatePost);